import EventEmitter from 'events';

import Wrapper from 'browserstacktunnel-wrapper';

export class Browserstack extends EventEmitter {
  constructor(options) {
    super();
    this.options = {
      key: options.key,
      hosts: [{
        name: options.host,
        port: options.port,
        sslFlag: 0,
      }],
      onlyAutomate: true,
    };

    this.tunnel = new Wrapper(options);
  }

  start() {
    return new Promise((resolve, reject) => {
      this.tunnel.start(error => {
        if (error) {
          this.emit('error', error);
          reject(error);
          return;
        }

        this.emit('start', 'Tunnel opened');
        resolve();
      });
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      this.tunnel.stop(error => {
        if (error) {
          this.emit('error', error);
          reject(error);
          return;
        }

        this.emit('stop', 'Tunnel closed');
        resolve();
      });
    });
  }
}
