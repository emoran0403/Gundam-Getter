import { Builder, By } from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";

const SKUS = ["4573102632593", "4580590127586"];

async function getDates() {
  const results: any = [];
  for await (const SKU of SKUS) {
    const res = await googleIt(SKU);
    results.push(res);
  }
  console.log(results);
}

getDates();

const googleIt = async (SKU: string) => {
  let driver = await new Builder()
    .setFirefoxOptions(new firefox.Options().headless().windowSize({ width: 1, height: 1 }))
    .forBrowser("firefox")
    .build();

  try {
    await driver.get("https://1999.co.jp/");
    const input = await driver.findElement(By.id("MainHeader_txtSearchword"));
    const searchButton = await driver.findElement(By.id("MainHeader_btnSearch"));

    await input.sendKeys(SKU);
    await searchButton.click();

    const releaseDateTR = await driver.findElement(By.id("masterBody_trSalesDate")).getAttribute("innerText");

    return { SKU, releaseDateTR };
  } catch (error) {
    console.log(error);
  } finally {
    await driver.quit();
  }
};
