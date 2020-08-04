let Page = require('../basePage');
const locator = require('./locator');
const fake = require('../../utils/fakeData');

const oganisation_handle_input_xpath = locator.oganisation_handle_input_xpath;
const oganisation_handle_button_xpath = locator.oganisation_handle_button_xpath;
const oganisation_handle_error_text_xpath = locator.oganisation_handle_error_text_xpath;

const fakeNameKeyword = fake.nameKeyword;

let handleInput, handleButton, errorElement;

Page.prototype.findInputAndButton = async function () {
    handleInput = await this.findByXPath(oganisation_handle_input_xpath);
    handleButton = await this.findByXPath(oganisation_handle_button_xpath);

    const result = await this.driver.wait(async function () {
        const handleInputClass = await handleButton.getAttribute('class');
        return {
          handleInputClass: handleInputClass
        }
    }, 5000);

    return result;
};

Page.prototype.submitWrongHandle = async function() {

    await this.findInputAndButton();
    await this.write(handleInput, 'wronginput');
    await handleButton.click();
    errorElement = await this.findByXPath(oganisation_handle_error_text_xpath);
    return await this.driver.wait(async function () {
        return await errorElement.getText();
    }, 5000);

};

module.exports = Page;
