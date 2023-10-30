const { expect } = require('chai');
const {Builder, By, Key, until} = require('selenium-webdriver');
const should = require('chai').should(); 

/* As a customer 
i would like to add a item to my cart so 
that i can see a list of items before checking out*/

describe('Add a item to the cart', () => {
    context('I press Add to Cart', () => {
        it('The item should be added to the cart when the "Add to Cart" button is clicked', async () =>{
            const driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get('https://magento.softwaretestingboard.com');
                await driver.findElement(By.id('search')).sendKeys('shirt', Key.ENTER);
                await driver.sleep(3000);
                await driver.wait(until.elementLocated(By.css('.product-item-link')), 10000);
                await driver.findElement(By.css('.product-item-link')).click();
                await driver.wait(until.elementLocated(By.id('option-label-size-143-item-166')), 10000);
                await driver.findElement(By.id('option-label-size-143-item-166')).click();
                await driver.findElement(By.id('option-label-color-93-item-50')).click();
                await driver.wait(until.elementLocated(By.id('product-addtocart-button')), 10000);
                await driver.findElement(By.id('product-addtocart-button')).click();
                await driver.sleep(3000);
                await driver.findElement(By.css('.action.showcart')).click();
                await driver.findElement(By.className('product-item-details'),10000);
                const item = await driver.findElement(By.css('.product-item-details'));
                expect(item).to.exist
                


            } finally {
              await driver.quit();
            }
            
        });
    });
});