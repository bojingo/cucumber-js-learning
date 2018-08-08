const { until } = require('selenium-webdriver')

class FixedPositionCondition {
    constructor(driver) {
        this._driver = driver
        this._currentPosition = null
    }

    async apply(element) {
        const precision = 6;
        if (this._currentPosition == null) {
            this._currentPosition = await element.getLocation()
            return false
        }
        await this._driver.sleep(10)
        let newPosition = await element.getLocation();
        if (newPosition.x.toPrecision(precision) === this._currentPosition.x.toPrecision(precision) && newPosition.y.toPrecision(precision) === this._currentPosition.y.toPrecision(precision)) {
            return element
        }
        this._currentPosition = newPosition
        return false
    };
}

module.exports = {
    lazyLoad: async function (driver, bySelector) {
        let element = await driver.wait(until.elementLocated(bySelector))
        await driver.wait(until.elementIsVisible(element))
        return await driver.findElement(bySelector)
    },

    waitForFixedPosition: function(element) {
        let condition = new FixedPositionCondition(driver)
        return driver.wait(() => condition.apply(element))
    }
}