import * as Types from "../../../Types";
import { By } from "selenium-webdriver";
import dayjs from "dayjs";

const thisScraperSite = "SITE_NAME_HERE";

/**
 * Scraper Strategy: SKU into URL injection
 * Inject the SKU into the URL
 * Grab the release date
 * (kotobukiya)
 *
 * Scraper Strategy: Input and Search
 * Locate the search input and search button
 * Type SKU into the input and click the search button
 * Grab the release date
 * (1999co)
 */

/**
 * Scraper for the website "SITE_NAME_HERE"
 * @param driver The Selenium WebDriver
 * @param modelKit A modelKit object
 * @returns An object of Type: ModelKitResult
 * * IF successful, the release date will be displayed as a link to the website
 * * If unsuccessful, "Not Found" will be displayed as a link to the website
 */ //@ts-ignore
export const scraper_SITENAMEHERE = async (driver, modelKit: Types.ModelKit): Promise<Types.ModelKitResult> => {
  try {
    //* navigate to the website
    await driver.get(thisScraperSite);

    //@@@@@ Input and Search
    //* find the input and search button
    //# const input = await driver.findElement(By.id("MainHeader_txtSearchword"));
    //# const searchButton = await driver.findElement(By.id("MainHeader_btnSearch"));
    //* enter in the SKU to the input, and click the search button
    //# await input.sendKeys(modelKit.SKU);
    //# await searchButton.click();
    //* find the release date in the DOM, and retrieve the innerText
    //# const releaseDate = await driver.findElement(By.id("masterBody_trSalesDate")).getAttribute("innerText");

    //@@@@@ SKU into URL injection
    //* Inject the SKU into the URL
    //# await driver.get(`https://shop.kotobukiya.co.jp/shop/g/g${modelKit.SKU}/`);
    //* find the release date in the DOM, and retrieve the innerText
    //# const releaseDate = await driver.findElement(By.css(".goods_about > p:nth-child(2)")).getAttribute("innerText");

    //@@@@@ COMMON STEPS
    //* grab the site URL to allow for linking to the site from the sheet
    const siteURL = await driver.getCurrentUrl();
    //* grab today's date for the scrapedDate
    const scrapedDate = dayjs().format("MMMM/DD/YYYY");
    //* IF Successful - return an object with the data
    //! uncomment next line when scraper logic is complete
    // return { ...modelKit, releaseDate: `=HYPERLINK("${siteURL}","${releaseDate}")`, scrapedDate, found: true };
  } catch (error) {
    //* if the website did not have the item, log it
    console.log(`SKU ${modelKit.SKU} was not found on ${thisScraperSite}`);

    //* grab the site URL to allow for linking to the site from the sheet
    const siteURL = await driver.getCurrentUrl();
    //* grab today's date for the scrapedDate
    const scrapedDate = dayjs().format("MMMM/DD/YYYY");

    //* IF Unsuccessful - return the object with the data and unsuccessful message
    return {
      ...modelKit,
      releaseDate: `=HYPERLINK("${siteURL}","Not Found")`,
      scrapedDate,
      found: false,
    };
  }
};
