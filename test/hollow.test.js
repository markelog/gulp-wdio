import wdio from '../src';

import { Hollow } from '../src/transports/hollow';

describe('hollow', function() {
  let hollow;

  beforeEach(() => {
    hollow = new Hollow();
  });

  it('"start"s', () => {
    return hollow.start();
  });

  it('"stop"s', () => {
    return hollow.stop();
  });

  it('emit\'s "start" event', function test(done) {
    hollow.on('start', () => done());
    hollow.start();
  });

  it('emit\'s "stop" event', function test(done) {
    hollow.on('stop', () => done());
    hollow.stop();
  });
});
