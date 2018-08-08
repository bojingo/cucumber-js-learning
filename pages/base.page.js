const { By, until } = require('selenium-webdriver')
const { lazyLoad, waitForFixedPosition } = require('./elementLoader')

class BasePage {
    constructor (driver) {
        this.driver = driver
        
        this.signInSelector = By.linkText('Sign in')
    }

    usernameElement () { return lazyLoad(driver, By.name('identifier')) }
    passwordElement () { return lazyLoad(driver, By.name('password')) }
    submitUsernameElement () { return lazyLoad(driver, By.id('identifierNext')) }
    submitPasswordElement () { return lazyLoad(driver, By.id('passwordNext')).then(waitForFixedPosition) }
    accountProfileElement () { return lazyLoad(driver, By.linkText("Google Account")) }
    accountElement () { return lazyLoad(driver, By.css('a.gb_b.gb_R')) }
    signInElement () { return lazyLoad(driver, this.signInSelector) }

    async startLogin () {
        await (await this.signInElement()).click()
    }

    async enterUsername (usernameValue) {
        await (await this.usernameElement()).sendKeys(usernameValue)
        await (await this.submitUsernameElement()).click()
    }

    async enterPassword (passwordValue) {
        await (await this.passwordElement()).sendKeys(passwordValue)
        await (await this.submitPasswordElement()).click()
    }

    async login (usernameValue, passwordValue) {
        if (await (await driver.findElements(this.signInSelector)).length > 0) {
            await this.startLogin()
        }
        await this.enterUsername(usernameValue)
        await this.enterPassword(passwordValue)
    }

    async accountTitle () {
        let element = await this.accountElement()
        let elementTitle = await element.getAttribute('title')
        return elementTitle
    }

    async validationMessages() {
        const start = process.hrtime()
        await this.driver.wait(async () => {
            const progress = process.hrtime(start)
            return (await driver.findElements(By.css('div.dEOOab'))).lenth > 0 || progress[0] > 2
        })
        let results = await this.driver.findElements(By.css('div.dEOOab'))
        let messages = []
        for (const element of results) {
            let message = await element.getText()
            messages.push(message)
        }
        return messages
    }
}

module.exports = BasePage