const { describe, it, after, before } = require('mocha');
const Page = require('../lib/screens/onboarding_screen');
const Config = require('../test_config');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function example() {
    try {
        describe ('app.nopos.com automated testing', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(Config.base_url);
            });

            afterEach (async () => {
                await page.quit();
            });

            it ('find the input box and organisation handle button', async () => {
              const result = await page.findInputAndButton();
              expect(result.handleInputClass).to.include('disabled-cta-button-container-small');
            });

            it ('enter wrong organisation handle and wait for error', async () => {
                const result = await page.submitWrongHandle();
                console.log(result)
                expect(result).to.include('Invaild Org');
            });
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();
