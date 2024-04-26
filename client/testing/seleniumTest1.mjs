import pkg from 'selenium-webdriver';
const { Builder, By, Key, until } = pkg;
//const driver = new webdriver.Builder().forBrowser("firefox").build();
import { assert } from 'chai';
import chalk from 'chalk';
// Instantiate a web browser page
async function testCarDetails() {
  try{

    const driver = await new Builder().forBrowser("firefox").build();

    await driver.get("http://localhost:3000");

    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.wait(until.elementLocated(By.id('menu-button-:r3:')), 50000);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const makeDropDown = await driver.findElement(By.id('menu-button-:r3:'));
    assert.isNotNull(makeDropDown);
    makeDropDown.click();
    await new Promise(resolve => setTimeout(resolve, 3000));

    const subaruMakeOption = await driver.findElement(By.id('menu-list-:r3:-menuitem-:r5:'));
    assert.isNotNull(subaruMakeOption);
    subaruMakeOption.click();
    await new Promise(resolve => setTimeout(resolve, 3000));

    const searchButton = await driver.findElement(By.id('searchButton'));
    assert.isNotNull(searchButton);
    searchButton.click();
    await new Promise(resolve => setTimeout(resolve, 3000));

    const clearButton = await driver.findElement(By.id('clearButton'));
    assert.isNotNull(clearButton);
    clearButton.click();
    await new Promise(resolve => setTimeout(resolve, 3000));

  } catch (error) {
    console.error('Test failed!', error);
  } finally {
    await driver.quit();
  }

}

testCarDetails();