const { BeforeAll, After, Before, AfterAll } = require('cucumber');
const { Builder } = require('selenium-webdriver')
const environments = require('../../config/environments')

var buildChromeDriver = function () {
    return new Builder().forBrowser("chrome").build();
}

var buildFirefoxDriver = function () {
    return new Builder().forBrowser("firefox").build();
}

var buildDriver = function (browser) {
    console.log("Browser: " + browser)
    switch (browser.toUpperCase()) {
        case 'FIREFOX':
            return buildFirefoxDriver()
        case 'CHROME':
            return buildChromeDriver()
        default:
            console.error("Specify a browser!")
    }
}

BeforeAll(function () {
    global.environment = environments[process.env.RUNTIME_ENVIRONMENT || "local"]
    console.log('Using environment configuration: ' + JSON.stringify(global.environment))
})

Before(function () {
    global.driver = buildDriver(process.env.BROWSER || "CHROME")
})

After(function () {
    if (global.driver != null) {
        global.driver.quit()
    }
})