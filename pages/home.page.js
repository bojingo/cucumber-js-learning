const { By } = require('selenium-webdriver')
const { lazyLoad, waitForFixedPosition } = require('./elementLoader')
const BasePage = require('./base.page')

class HomePage extends BasePage {

    constructor(driver) {
        super(driver)
    }

    static get URL () { return global.environment.baseUrl }

    static async visit (driver) {
        await driver.get(HomePage.URL)
        return new HomePage(driver)
    }
}

module.exports = HomePage