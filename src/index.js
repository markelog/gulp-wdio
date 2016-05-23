import through from 'through2';
import gutil from 'gulp-util';
import Launcher from 'webdriverio/build/lib/launcher';

import { Browserstack } from './transports/browserstack';
import { Selenium } from './transports/selenium';
import { Hollow } from './transports/hollow';

const transports = {
  browserstack: Browserstack,
  selenium: Selenium,
  hollow: Hollow
};

function emitError(transport, error) {
  process.stdin.pause();

  const pluginError = new gutil.PluginError({
    plugin: 'gulp-wdio',
    message: error
  });

  transport.stop();
  process.nextTick(() => {
    this.emit('error', pluginError);
  });
}

export default (options) => {
  const wdioOptions = options.wdio;
  const Transport = transports[options.type || 'hollow'];

  return through.obj(function obj(file, encoding, callback) {
    const wdio = new Launcher(file.path, wdioOptions);
    const config = wdio.configParser.getConfig();

    const transport = new Transport(config);
    const showError = emitError.bind(this, transport);

    transport.on('error', showError);

    transport.on('message', gutil.log.bind(gutil));
    transport.on('start', gutil.log.bind(gutil));
    transport.on('stop', gutil.log.bind(gutil));

    this.on('finish', () => transport.stop());

    // Hail Mary, not sure if this would work though, since action is async
    process.on('uncaughtException', () => transport.stop());
    process.on('exit', () => transport.stop());

    transport.start().then(() => {
      return wdio.run().then(code => {
        if (code !== 0) {
          showError(`wdio exited with code ${code}`);
        } else {
          process.stdin.pause();
        }

        callback();
      });
    });

    return this;
  });
};
