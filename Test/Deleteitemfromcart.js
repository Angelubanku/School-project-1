const { expect } = require('chai');
const {Builder, By, Key, until} = require('selenium-webdriver');
const should = require('chai').should(); 

/* As a customer 
i would like the ability to remove a item from my cart
so that I can purchase only the things I want*/

describe('Delete a item to the cart', () => {
    context('I press Rrmove item', () => {
        it('The item should be removed from my cart when the remove button is clicked', async () =>{
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
                await driver.sleep(8000);
                await driver.findElement(By.css('.action.showcart')).click();
                await driver.findElement(By.className('product-item-details'));
                await driver.findElement(By.css('.action.delete')).click()
                await driver.wait(until.elementLocated(By.css('.action-primary.action-accept')), 10000);
                await driver.sleep(3000);
                await driver.findElement(By.css('.action-primary.action-accept')).click()
                await driver.sleep(8000);
                const text = await driver.findElement(By.css('.subtitle.empty'));
                console.log(await text.getText())
                

                expect(await text.getText()).to.equal('You have no items in your shopping cart.')
                


            } finally {
              await driver.quit();
            }
            
        });
    });
}); 

