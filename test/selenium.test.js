import wdio from '../src';

describe('selenium', function() {
  let wd;

  describe('without errors', () => {
    before(() => {
      wd = wdio({
        type: 'selenium',
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

    it('should run through local selenium test', function(done) {
      this.timeout(0);

      wd.on('finish', () => done());

      wd.write({
        path: `${__dirname}/without-errors.conf.js`
      });

      wd.end();
    });
  });

  describe('with errors', () => {
    before(() => {
      wd = wdio({
        type: 'selenium'
      });
    });

    it('should run through local selenium test', function(done) {
      this.timeout(0);

      wd.on('finish', () => done());

      wd.write({
        path: `${__dirname}/with-errors.conf.js`
      });

      wd.end();
    });
  });
});
