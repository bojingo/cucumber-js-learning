const gulp = require('gulp')
const exec = require('child_process').exec

let runCucumber = function (browser, environment, cucumberArgs) {
    process.env.BROWSER = browser
    process.env.TEST_ENVIRONMENT = environment

    let options = {
        env: {
            'BROWSER':  process.env.BROWSER
        }
    }
    exec('node ./node_modules/cucumber/bin/cucumber-js ' + cucumberArgs, options, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    })
}

gulp.task('chrome-local', function () {
    runCucumber('chrome', 'local', '--tags="not @wip"');
})

gulp.task('firefox-local', function () {
    runCucumber('firefox', 'local', '--tags="not @wip"');
})

gulp.task('chrome-dev', function () {
    runCucumber('chrome', 'dev', '--tags="not @wip"');
})

gulp.task('firefox-dev', function () {
    runCucumber('firefox', 'dev', '--tags="not @wip"');
})

gulp.task('chrome-local-wip', function () {
    runCucumber('chrome', 'local', '--tags @wip');
})

gulp.task('firefox-local-wip', function () {
    runCucumber('firefox', 'local', '--tags @wip');
})

gulp.task('chrome-dev-wip', function () {
    runCucumber('chrome', 'dev', '--tags @wip');
})

gulp.task('firefox-dev-wip', function () {
    runCucumber('firefox', 'dev', '--tags @wip');
})