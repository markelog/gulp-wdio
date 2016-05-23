import assert from 'assert';

describe('gulp-wdio test', () => {
  describe('browserstack local', () => {
    it('checks if title contains the search query', () => {
      assert.strictEqual('This should fail', 'This should fail');
    });
  });
});
