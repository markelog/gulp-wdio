import assert from 'assert';

describe('gulp-wdio test', () => {
  describe('browserstack local', () => {
    it('checks if title contains the search query', () => {
      browser.url('/');
      var title = browser.getTitle();
      assert.strictEqual(title, 'Incorrect');
    });
  });
});
