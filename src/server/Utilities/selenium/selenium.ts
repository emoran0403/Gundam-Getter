import { Builder, By } from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";
import * as Types from "../../../../Types";

export async function getDates(SKUArray: string[]) {
  const results: Types.SKUResult[] = [];
  for await (const [i, SKU] of SKUArray.entries()) {
    const res = await scraper(SKU);
    console.log(`Finished scraping SKU: ${i + 1} out of ${SKUArray.length}`);
    if (res) {
      results.push(res);
    }
  }
  // console.log(`getDates function results below:`);
  // console.log(results);

  return results;
}

const scraper = async (SKU: string) => {
  let driver = await new Builder()
    .setFirefoxOptions(new firefox.Options().headless().windowSize({ width: 1, height: 1 }))
    // .setFirefoxOptions(new firefox.Options().setBinary(`C:\Users\emora\geckodriver-v0.31.0-win64`))
    .forBrowser("firefox")
    .build();

  try {
    await driver.get("https://1999.co.jp/");
    const input = await driver.findElement(By.id("MainHeader_txtSearchword"));
    const searchButton = await driver.findElement(By.id("MainHeader_btnSearch"));

    await input.sendKeys(SKU);
    await searchButton.click();

    const releaseDateTR = await driver.findElement(By.id("masterBody_trSalesDate")).getAttribute("innerText");
    // console.log({ SKU, releaseDateTR });
    return { SKU, releaseDateTR };
  } catch (error) {
    console.log(`SKU ${SKU} was not found, error message below`);
    console.log(error);
  } finally {
    await driver.quit();
  }
};
