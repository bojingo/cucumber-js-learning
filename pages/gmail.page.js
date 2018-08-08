const { By } = require('selenium-webdriver')
const { lazyLoad, waitForFixedPosition } = require('./elementLoader')
const BasePage = require('./base.page')

class GmailPage extends BasePage {

    constructor(driver) {
        super(driver)
    }

    static get URL () { return "http://www.gmail.com" }

    static async visit (driver) {
        await driver.get(GmailPage.URL)
        return new GmailPage(driver)
    }
    
    activeFolderElement () { return lazyLoad(driver, By.css('div.aim.ain')) }
}

module.exports = GmailPage