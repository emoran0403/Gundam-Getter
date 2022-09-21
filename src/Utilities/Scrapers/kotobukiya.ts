import * as Types from "../../../Types";
import { By } from "selenium-webdriver";
import dayjs from "dayjs";

const thisScraperSite = "https://shop.kotobukiya.co.jp/shop/";
const baseURL = "https://shop.kotobukiya.co.jp/shop/g/g<SKU_HERE>/";

/**
 * Scraper Strategy: SKU into URL injection
 * Inject the SKU into the URL
 * Grab the release date
 */

/**
 * Scraper for the website "https://shop.kotobukiya.co.jp/shop/"
 * @param driver The Selenium WebDriver
 * @param modelKit A modelKit object
 * @returns An object of Type: ModelKitResult
 * * IF successful, the release date will be displayed as a link to the website
 * * If unsuccessful, "Not Found" will be displayed as a link to the website
 */ //@ts-ignore
export const scraper_kotobukiya = async (driver, modelKit: Types.ModelKit): Promise<Types.ModelKitResult> => {
  try {
    //* Inject the SKU into the URL
    await driver.get(`https://shop.kotobukiya.co.jp/shop/g/g${modelKit.SKU}/`);

    //* find the release date in the DOM, and retrieve the innerText
    const releaseDate = await driver.findElement(By.css(".goods_about > p:nth-child(2)")).getAttribute("innerText");

    //* grab the site URL to allow for linking to the site from the sheet
    const siteURL = await driver.getCurrentUrl();

    //* grab today's date for the scrapedDate
    const scrapedDate = dayjs().format("MMMM/DD/YYYY");

    //* IF Successful - return an object with the data
    return { ...modelKit, releaseDate: `=HYPERLINK("${siteURL}","${releaseDate}")`, scrapedDate };
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
    };
  }
};
