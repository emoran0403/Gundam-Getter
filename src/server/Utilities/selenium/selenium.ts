import { Builder, By, Capabilities } from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";
import * as Types from "../../../../Types";

export async function getDates(SKUArray: string[]) {
  const results: Types.SKUResult[] = [];
  for await (const [i, SKU] of SKUArray.entries()) {
    const res = await scraper(SKU);
    console.log(`Finished scraping SKU: ${i + 1} out of ${SKUArray.length}`);
    results.push(res);
  }
  // console.log(`getDates function results below:`);
  // console.log(results);

  return results;
}

const scraper = async (SKU: string) => {
  let caps = new Capabilities();
  caps.setPageLoadStrategy("eager");

  // let profile = Profile()

  let driver = await new Builder()
    .setFirefoxOptions(new firefox.Options().headless().windowSize({ width: 1, height: 1 }))
    // .setFirefoxOptions(new firefox.Options().setBinary(`C:\Users\emora\geckodriver-v0.31.0-win64`))
    .withCapabilities(caps)

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
    //# add code for additional sites within additional trycatch blocks, nesting further within the catch block

    console.log(`SKU ${SKU} was not found on https://1999.co.jp/, will try site 2 once i code it`);
    // console.log(error);
    try {
      //test site 2
      //return { SKU, releaseDateTR };
    } catch (error) {
      // console.log(`SKU ${SKU} was not found on site 2, will try site 3 once i code it`);
      // try {
      //   // test site 3
      //   //return { SKU, releaseDateTR };
      // } catch (error) {
      //   // return { SKU, releaseDateTR: `could not find on any site` };
      // }
    }
    const site1URL = await driver.getCurrentUrl();
    return { SKU, releaseDateTR: `=HYPERLINK("${site1URL}","Manually verify")` };
  } finally {
    await driver.quit();
  }
};

try {
} catch (error) {}
