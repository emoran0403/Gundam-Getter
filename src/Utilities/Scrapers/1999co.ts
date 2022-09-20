import * as Types from "../../../Types";
import { By } from "selenium-webdriver";
import dayjs from "dayjs";

const thisScraperSite = "https://1999.co.jp/";

/**
 * Scraper for the website "https://1999.co.jp/"
 * @param driver The Selenium WebDriver
 * @param modelKit A modelKit object
 * @returns An object of Type: ModelKitResult
 * * IF successful, the release date will be displayed as a link to the website
 * * If unsuccessful, "Not Found" will be displayed as a link to the website
 */ //@ts-ignore
export const scraper_1999co = async (driver, modelKit: Types.ModelKit): Promise<Types.ModelKitResult> => {
  try {
    //* naivgate to the website
    await driver.get(thisScraperSite);

    //* find the input and search button
    const input = await driver.findElement(By.id("MainHeader_txtSearchword"));
    const searchButton = await driver.findElement(By.id("MainHeader_btnSearch"));

    //* enter in the SKU to the input, and click the search button
    await input.sendKeys(modelKit.SKU);
    await searchButton.click();

    //* find the release date in the DOM, and retrieve the innerText
    const releaseDate = await driver.findElement(By.id("masterBody_trSalesDate")).getAttribute("innerText");

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
