import { expect } from 'chai';

describe('gulp-wdio test', () => {
  describe('browserstack local', () => {
    it('should have right options', () => {
      expect(browser.options.waitforTimeout).to.equal(12345);
      expect(browser.options.coloredLogs).to.equal(true);
      expect(browser.options.logLevel).to.equal('verbose');
      expect(browser.options.cucumberOpts.require).to.equal( 'nothing');
    });

    it('checks if title contains the search query', () => {
      browser.url('/');
      var title = browser.getTitle();
      expect(title).to.equal('WebdriverIO - Selenium 2.0 javascript bindings for nodejs');
    });
  });
});
