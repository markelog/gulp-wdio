import EventEmitter from 'events';

import selenium from 'selenium-standalone';

export class Selenium extends EventEmitter {
  constructor() {
    super();

    this.child = null;

    this.config = {
      logger: (message) => {
        this.emit('message', message);
      },
    };
  }

  install() {
    return new Promise((resolve, reject) => {
      selenium.install(this.config, (error) => {
        if (error) {
          this.emit('error', error);
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  start() {
    return new Promise((resolve, reject) => {
      this.install().then(() => {
        selenium.start({
          spawnOptions: {
            stdio: 'ignore',
          },
        }, (error, child) => {
          if (error) {
            this.emit('error', error);
            reject(error);
            return;
          }

          this.child = child;

          this.emit('start', 'Selenium started');
          resolve(child);
        });
      }).catch(reject);
    });
  }

  stop() {
    return new Promise((resolve) => {
      // Since child defined only at the "start"
      if (this.child) {
        this.child.kill();
        this.child = null;
        this.emit('stop', 'Selenium stopped');
      }

      resolve();
    });
  }
}
