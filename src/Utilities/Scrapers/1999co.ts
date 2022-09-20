import { By } from "selenium-webdriver";

/**
 * @param SKU An SKU number to used to search the specified websites, ideally finding a release date.
 * @returns
 * * If successful, returns an object containing the SKU and release date.
 * * If not, returns an object containing the SKU and a link to the search results page.
 */ //@ts-ignore
export const scraper_1999co = async (driver, SKU: string) => {
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
    //* if the first website did not have the item, log it, and check other sites
    console.log(`SKU ${SKU} was not found on https://1999.co.jp/`);

    // console.log(error);
    //* if the release date cannot be found, get the URL
    const site1URL = await driver.getCurrentUrl();

    //* return the object with the url formatted as a GoogleSheet link for manual verification
    return { SKU, releaseDateTR: `=HYPERLINK("${site1URL}","Manually verify")` };
  }
};
