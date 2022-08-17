import { Builder, By, Capabilities } from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";

interface SKUResult {
  SKU: string;
  releaseDateTR: string;
}

/**
 * This function launches a headless firefox browser via Selenium,
 * and scrapes release data information from specified websites using the provided SKU numbers.
 * @param SKUArray An array of SKU numbers with which Selenium will query the given websites.
 * @returns Returns a Promise, which resolves into an array of objects containing the SKU, and the release date.
 */
export async function getDates(SKUArray: string[]) {
  //* define an empty array to place the SKU results into
  const results: SKUResult[] = [];

  //* define capabilities for the browser
  /**
   * This will make Selenium WebDriver to wait until the initial HTML document has been completely loaded and parsed
   * and discards loading of stylesheets, images and subframes.
   * When set to eager, Selenium WebDriver waits until DOMContentLoaded event fire is returned.
   */
  let caps = new Capabilities();
  caps.setPageLoadStrategy("eager");

  //* build a new selenium firefox browser with the given options / capabilities
  let Selenium = await new Builder()
    .setFirefoxOptions(new firefox.Options().headless().windowSize({ width: 1, height: 1 }))
    .withCapabilities(caps)
    .forBrowser("firefox")
    .build();

  //* iterate over the SKU array, and for each SKU in the array, call scraper with the given SKU number
  for await (const [i, SKU] of SKUArray.entries()) {
    //* await the result of scraper
    const res = await scraper(Selenium, SKU);

    //* log progress
    console.log(`Finished scraping SKU: ${i + 1} out of ${SKUArray.length}`);

    //* push the results into the results array
    results.push(res);
  }
  // console.log(`getDates function results below:`);
  // console.log(results);
  //* when the loop has finished scraping, the browser must quit
  await Selenium.quit();

  //* when the iteration is complete, return the results array
  return results;
}

/**
 * @param SKU An SKU number to used to search the specified websites, ideally finding a release date.
 * @returns
 * * If successful, returns an object containing the SKU and release date.
 * * If not, returns an object containing the SKU and a link to the search results page.
 */ //@ts-ignore
const scraper = async (driver, SKU: string) => {
  // //* define capabilities for the browser
  // // eager directs selenium to begin once the DOM tree is loaded
  // let caps = new Capabilities();
  // caps.setPageLoadStrategy("eager");

  // //* build a new selenium firefox browser with the given options / capabilities
  // let driver = await new Builder()
  //   .setFirefoxOptions(new firefox.Options().headless().windowSize({ width: 1, height: 1 }))
  //   .withCapabilities(caps)
  //   .forBrowser("firefox")
  //   .build();

  //* If selenium cannot find an element, or encounters an issue, it throws an error
  try {
    //* naivgate to the first website
    await driver.get("https://1999.co.jp/");

    //* find the input and search button
    const input = await driver.findElement(By.id("MainHeader_txtSearchword"));
    const searchButton = await driver.findElement(By.id("MainHeader_btnSearch"));

    //* enter in the SKU to the input, and click the search button
    await input.sendKeys(SKU);
    await searchButton.click();

    //* find the release date in the DOM, and retrieve the innerText
    const releaseDateTR = await driver.findElement(By.id("masterBody_trSalesDate")).getAttribute("innerText");

    //* return an object containing the SKU and release date
    return { SKU, releaseDateTR };
  } catch (error) {
    //# add code for additional sites within additional trycatch blocks, nesting further within the catch block
    //* if the first website did not have the item, log it, and check other sites
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
    //* if the release date cannot be found, get the URL
    const site1URL = await driver.getCurrentUrl();
    //* return the object with the url formatted as a GoogleSheet link for manual verification
    return { SKU, releaseDateTR: `=HYPERLINK("${site1URL}","Manually verify")` };
  }
};
