gulp-wdio [![Build Status](https://travis-ci.org/markelog/gulp-wdio.svg?branch=master)](https://travis-ci.org/webdriverio/gulp-wdio)

# gulp-wdio

Same as [gulp-webdriver](https://github.com/webdriverio/gulp-webdriver) with three key differences:
- built-in browserstack support
- built-in selenium support
- included webdriver.io package (so you wouldn't have to)

So you could just simple do
```js
gulp.task('e2e', () => {
  gulp.src(paths.wdio.local).pipe(wdio({

    // Omit "type" property if you want start wdio without additional layers
    type: 'selenium' // or "browserstack"
    wdio: {} // Same arguments as with `wdio --help`
  }));
});
```

Instead of something like this (taken [from](https://github.com/webdriverio/gulp-webdriver/blob/72c088ece031c70e568296583ef6170bec4ac58d/gulp/test.js) `gulp-webdriver` test script)
```js
// For local selenium
import gulp from 'gulp'
import selenium from 'selenium-standalone'
import webdriver from '../lib/index'

export default options => {
    let errorLog = options.errorHandler('Selenium start')

    gulp.task('selenium:start', done => {
        selenium.install({
            logger (message) {
                process.stdout.write(`${message} \n`)
            },
            progressCb: (totalLength, progressLength) => {
                process.stdout.write(`Downloading drivers ${Math.round(progressLength / totalLength * 100)}% \r`)
            }
        }, err => {
            if (err) return done(err)

            selenium.start({
                spawnOptions: {
                    stdio: 'ignore'
                }
            }, (err, child) => {
                selenium.child = child
                errorLog(err)
                done()
            })
        })
    })

    gulp.task('test', ['selenium:start'], () => {
        return gulp.src(`${options.test}/wdio.*`)
            .pipe(webdriver({
                logLevel: 'verbose',
                waitforTimeout: 12345,
                framework: 'mocha',
                // only for testing purposes
                cucumberOpts: {
                    require: 'nothing'
                }
            })).once('end', () => {
                selenium.child.kill()
            })
    })
}
```
