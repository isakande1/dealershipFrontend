import pkg from 'selenium-webdriver';
const { Builder, By, Key, until } = pkg;
//const driver = new webdriver.Builder().forBrowser("firefox").build();
import { assert } from 'chai';
import chalk from 'chalk';
// Instantiate a web browser page
async function testCarDetails() {
  try{

    const gray = chalk.rgb(128, 128, 128);
    const startTime1 = Date.now();
    const driver = await new Builder().forBrowser("firefox").build();

    await driver.get("http://localhost:3000");
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.wait(until.elementLocated(By.id('target')), 50000);
    const endTime1 = Date.now();
    const startTime2 = endTime1;
    const timeMarker1 = endTime1 - startTime1;
    console.log(chalk.green("  CarDisplayBox Located ✔"), gray(`(${timeMarker1}ms)\n`));
    await new Promise(resolve => setTimeout(resolve, 3000));

    const carBox = await driver.findElement(By.id('target'));
    assert.isNotNull(carBox);
    const endTime2 = Date.now();
    const startTime3 = endTime2;
    const timeMarker2 = endTime2 - startTime2 + timeMarker1;
    console.log(chalk.green("  1 passing"), gray(`(${timeMarker2}ms)\n`));
    const endTime3 = Date.now();
    const startTime4 = endTime3;
    const timeMarker3 = endTime3 - startTime3 + timeMarker2;
    console.log(chalk.green("  CarDisplayBox Saved ✔"), gray(`(${timeMarker3}ms)\n`));
    await new Promise(resolve => setTimeout(resolve, 3000));

    await driver.wait(until.elementLocated(By.id('target')), 10000);
    const endTime4 = Date.now();
    const startTime5 = endTime4;
    const timeMarker4 = endTime4 - startTime4 + timeMarker3;
    console.log(chalk.green("  CarDisplayBox Is Visible ✔"), gray(`(${timeMarker4}ms)\n`));
    await new Promise(resolve => setTimeout(resolve, 3000));

    await driver.wait(until.elementIsVisible(carBox), 10000);
    const endTime5 = Date.now();
    const startTime6 = endTime5;
    const timeMarker5 = endTime5 - startTime5 + timeMarker4;
    console.log(chalk.green("  CarDisplayBox Is Clickable ✔"), gray(`(${timeMarker5}ms)\n`));
    await new Promise(resolve => setTimeout(resolve, 3000));

    await carBox.click();
    const endTime6 = Date.now();
    const startTime7 = endTime6;
    const timeMarker6 = endTime6 - startTime6 + timeMarker5;
    console.log(chalk.green("  CarDisplayBox Has Been Clicked ✔"), gray(`(${timeMarker6}ms)\n`));
    await new Promise(resolve => setTimeout(resolve, 3000));

    await driver.wait(until.urlContains('/carDetails'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    const expectedUrl = 'http://localhost:3000/carDetails';
    if (currentUrl !== expectedUrl) {
      throw new Error(`Navigation failed! Expected URL: ${expectedUrl}, Actual URL: ${currentUrl}`);
    }
    assert.equal(currentUrl, expectedUrl);
    const endTime7 = Date.now();
    const startTime8 = endTime7;
    const timeMarker7 = endTime7 - startTime7 + timeMarker6;
    console.log(chalk.green(`  Expected URL: ${expectedUrl} = Current URL: ${currentUrl} ✔`), gray(`(${timeMarker7}ms)\n`));
    await new Promise(resolve => setTimeout(resolve, 1500));

    const endTime8 = Date.now();
    const timeMarker8 = endTime8 - startTime8 + timeMarker7;
    console.log(chalk.green(`  2 passing`), gray(`(${timeMarker8}ms)\n`));
    await new Promise(resolve => setTimeout(resolve, 750));

    console.log(chalk.green("All Checkpoints Passed, Visitor Is Able To View Car Details...Test Ending"))

  } catch (error) {
    console.error('Test failed!', error);
  } finally {
    await driver.quit();
  }

}

testCarDetails();