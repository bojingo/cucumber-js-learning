const { Given, When, Then } = require('cucumber')
const expect = require("chai").expect
const GmailPage = require("../../pages/gmail.page")

Given('I visit the gmail page', async () => {
    await GmailPage.visit(driver)
});

Then('I see my inbox', async () => {
    let activeFolder = await new GmailPage(driver).activeFolderElement()
    expect(await activeFolder.getText()).to.match(/^Inbox/)
});