import * as path from "path";
import { Builder, By, Capabilities } from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";
import { scraper_1999co } from "../Scrapers/1999co";
import { scraper_kotobukiya } from "../Scrapers/kotobukiya";
import * as Types from "../../../Types";

//* source the firefox binaries from the project directory instead of elsewhere on the machine
const geckopath = path.join(__dirname, "../../../../src/Utilities/selenium/");
Object.assign(process.env, { ...process.env, PATH: `${process.env.Path};${geckopath}` });

const Scrapers: Types.ScraperList = { gcz: scraper_1999co, koto: scraper_kotobukiya };

/**
 * This function launches a headless firefox browser via Selenium,
 * and scrapes release data information from specified websites using the provided SKU numbers.
 * @param ModelKitArray An array of SKU numbers with which Selenium will query the given websites.
 * @returns Returns a Promise, which resolves into an array of objects containing the SKU, and the release date.
 */
export async function launchSelenium(ModelKitArray: Types.ModelKit[]) {
  //* define an empty array to place the SKU results into
  const results: Types.ModelKitResult[] = [];

  //* define capabilities for the browser - 'eager' ignores loading css and images for performance
  let caps = new Capabilities();
  caps.setPageLoadStrategy("eager");

  //* build a new selenium firefox browser with the given options / capabilities
  console.log("\n");
  console.log(`Selenium is building...`);

  // console.log({ path: process.env });

  let Selenium = await new Builder()
    //! enable headless for production and disable headless for development
    .setFirefoxOptions(new firefox.Options().headless().windowSize({ width: 1, height: 1 }))
    // .setFirefoxOptions(new firefox.Options())
    .withCapabilities(caps)
    .forBrowser("firefox")
    .build();

  console.log("\n");
  console.log(`Finished building Selenium`);
  console.log("\n");
  console.log(`Scraping ${ModelKitArray.length} SKUs`);
  console.log("\n");

  //* iterate over the SKU array, and for each SKU in the array, call scraper with the given SKU number
  async function ScraperLoop() {
    for (let i = 0; i <= ModelKitArray.length - 1; i++) {
      const modelKit = ModelKitArray[i];
      const index = i;
      // console.log(`iteration ${i}`);
      // console.log({ modelKit });

      //* await the result of scraper
      //! Need a safe way to handle the case where a prefix is given that is not accounted for

      /**
       * Call the scraper function that corresponds with the given prefix
       * passing in the Selenium Browser and the modelKit object.
       */
      const res = await Scrapers[modelKit.prefix as keyof Types.ScraperList](Selenium, modelKit);
      // const res = await scraper_1999co(Selenium, modelKit);
      // console.log({ message: "this is res", res });
      //* log progress
      console.log(`Finished scraping SKU: ${index + 1} out of ${ModelKitArray.length}`);

      //* push the results into the results array
      results.push(res);
    }
  }
  // console.log(`before ScraperLoop function`);
  await ScraperLoop();
  // console.log(`after ScraperLoop function`);

  //* when the loop has finished scraping, the browser must quit, and return the results
  // console.log(`before quitting`);

  await Selenium.quit();
  // console.log(`after quitting`);
  // console.log({ message: `this is results`, results });
  return results;
}

/**
 * @param SKU An SKU number to used to search the specified websites, ideally finding a release date.
 * @returns
 * * If successful, returns an object containing the SKU and release date.
 * * If not, returns an object containing the SKU and a link to the search results page.
 */ //@ts-ignore
const scraper = async (driver, SKU: string) => {
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
