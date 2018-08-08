const { setWorldConstructor } = require('cucumber')

class BrowserWorld {
    constructor(attach, parameters) {
      this.attach = attach
      this.parameters = parameters
      this.driver = global.driver
    }
}

setWorldConstructor(BrowserWorld)