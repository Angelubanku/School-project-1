const { expect } = require('chai');
const {Builder, By, Key, until} = require('selenium-webdriver');
const should = require('chai').should(); 

/* As a customer 
i would like to see customer reviews of a item*/

describe('See reviews', () => {
    context('I press reviews', () => {
        it('Should be able too see reviews on the item', async () =>{
            const driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://magento.softwaretestingboard.com');
                await driver.findElement(By.id('search')).sendKeys('shirt', Key.ENTER);
                await driver.sleep(3000);
                await driver.wait(until.elementLocated(By.css('.product-item-link')), 10000);
                await driver.findElement(By.css('.product-item-link')).click();
                await driver.wait(until.elementLocated(By.id('tab-label-reviews-title')), 10000);
                await driver.findElement(By.id('tab-label-reviews-title')).click();
                await driver.findElement(By.id('tab-label-reviews-title')).click();
                await driver.wait(until.elementLocated(By.id('review-form')), 10000);
                driver.wait(until.elementLocated(By.id('review-form')), 10000)
                const reviewForm = await driver.findElement(By.id('review-form')).getText();
                reviewForm.should.contain('You\'re reviewing:');

                
                

            } finally {
              await driver.quit();
            }
            
        });
    });
})