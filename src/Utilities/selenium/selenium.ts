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
    //@ enable headless for production and disable headless for development
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
      // define modelKit and index for ease of use
      const modelKit = ModelKitArray[i];
      const index = i;
      //* log progress
      console.log(`Started SKU: ${index + 1} out of ${ModelKitArray.length}`);

      // console.log(`iteration ${i}`);
      // console.log({ modelKit });

      // define res here, then update it within the if else block with scraped data
      let res = {
        scrapable: true,
        rawSKU: "",
        prefix: "",
        SKU: 0,
        releaseDate: "",
        scrapedDate: "",
      };

      //* await the result of scraper
      // if there is a targeted scraper && there is good data, call the scraper and set its return as res
      if (Scrapers[modelKit.prefix as keyof Types.ScraperList] && modelKit.scrapable) {
        res = await Scrapers[modelKit.prefix as keyof Types.ScraperList](Selenium, modelKit);
      } else {
        // otherwise, call a wide-reaching scraper and set its return as res
        //! here we can possibly add more wide scrapers, or add it to a list to "skip for now"
        res = await scraper_1999co(Selenium, modelKit);
      }

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
