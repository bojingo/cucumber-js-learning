const { Given, When, Then } = require('cucumber')
const expect = require("chai").expect
const BasePage = require("../../pages/base.page")
const HomePage = require("../../pages/home.page")
const accounts = require('../../config/accounts.js')

Given('I visit the home page', async () => {
    await HomePage.visit(driver)
});

When('I log in as {string}', async (userKey) => {
    return await new BasePage(driver).login(accounts[userKey].username, accounts[userKey].password)
});

Then('I have access to {string} profile', async (userKey) => {
    let accountTitle = await new BasePage(driver).accountTitle()
    expect(accountTitle).to.contain(accounts[userKey].name)
});

Then('I am informed that my credentials are invalid', async () => {
    expect(await new BasePage(driver).validationMessages()).to.contain("Wrong password. Try again or click Forgot password to reset it.")
});