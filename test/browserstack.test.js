import sinon from 'sinon';
import { expect } from 'chai';

import { Browserstack } from '../src/transports/browserstack';
import { Selenium } from '../src/transports/selenium';
import wdio from '../src';

describe('browserstack', function describe() {
  let wd;
  let selenium = new Selenium();

  before(function() {
    this.timeout(0);

    return selenium.start();
  });

  beforeEach(() => {
    wd = wdio({
      type: 'browserstack',
      wdio: {
        logLevel: 'verbose',
        waitforTimeout: 12345,
        framework: 'mocha',
        // Only for testing purposes
        cucumberOpts: {
          require: 'nothing',
        }
      }
    });

    // Unhandled "error" event could be interpreted as violation
    wd.on('error', () => {});
  });

  afterEach(() => {
    if (Browserstack.prototype.start.restore) {
      Browserstack.prototype.start.restore();
    }
  });

  after(() => {
    return selenium.stop();
  });

  it('should pass correct arguments', function(done) {
    this.timeout(0);

    sinon.stub(Browserstack.prototype, 'start', function() {
      expect(this.options).to.deep.equal({
        key: 'test',
        hosts: [{
          name: '0.0.0.0',
          port: 4444,
          sslFlag: 0
        }],
        onlyAutomate: true
      });

      done();
      return new Promise(() => {});
    });

    wd.write({
      path: `${__dirname}/without-errors.conf.js`
    });
  });

  it('should start "through" browserstack tunnel', function(done) {
    this.timeout(0);
    sinon.stub(Browserstack.prototype, 'start').returns(new Promise(resolve => resolve()));

    wd.on('finish', () => done());

    wd.write({
      path: `${__dirname}/without-errors.conf.js`
    });

    wd.end();
  });
});
