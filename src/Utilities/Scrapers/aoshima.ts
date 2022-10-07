import * as Types from "../../../Types";
import { By } from "selenium-webdriver";
import dayjs from "dayjs";

const thisScraperSite = "https://www.aoshima-bk.co.jp/en/";
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Scraper Strategy: SKU into URL injection
 * Inject the SKU into the URL
 * Grab the release date
 * (kotobukiya)
 *
 */

/**
 * Scraper for the website "https://www.aoshima-bk.co.jp/en/"
 * @param driver The Selenium WebDriver
 * @param modelKit A modelKit object
 * @returns An object of Type: ModelKitResult
 * * IF successful, the release date will be displayed as a link to the website
 * * If unsuccessful, "Not Found" will be displayed as a link to the website
 */ //@ts-ignore
export const scraper_aoshima = async (driver, modelKit: Types.ModelKit): Promise<Types.ModelKitResult> => {
  try {
    //* navigate to the website
    await driver.get(thisScraperSite);

    //* Inject the SKU into the URL
    await driver.get(`https://www.aoshima-bk.co.jp/en/product/${modelKit.SKU}/`);

    //* find the release date in the DOM, and retrieve the innerText
    const rawReleaseDate = await driver
      .findElement(By.css("dl:nth-child(2) > dd:nth-child(8)"))
      .getAttribute("innerText");

    //* make the release date pretty
    // rawReleaseDate is a string in the form of "YYYY.MM"
    // split on . to get 'YYYY' 'MM'
    const releaseDateArr = rawReleaseDate.split(".");
    // find the word of the month that corresponds to the release date momth
    const monthString = MONTHS[Number(releaseDateArr[1]) + 1];
    // put it all together
    const releaseDate = `${monthString} ${releaseDateArr[0]}`;

    //* grab the site URL to allow for linking to the site from the sheet
    const siteURL = await driver.getCurrentUrl();
    //* grab today's date for the scrapedDate
    const scrapedDate = dayjs().format("MMMM/DD/YYYY");
    //* IF Successful - return an object with the data
    return { ...modelKit, releaseDate: `=HYPERLINK("${siteURL}","${releaseDate}")`, scrapedDate, found: true };
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
