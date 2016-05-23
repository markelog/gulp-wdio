import EventEmitter from 'events';

export class Hollow extends EventEmitter {
  start() {
    return new Promise(resolve => {
      this.emit('start');
      resolve();
    });
  }

  stop() {
    return new Promise(resolve => {
      this.emit('stop');
      resolve();
    });
  }
}
