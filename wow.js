const { info } = require("console");

const wowee = (string) => {
  console.log(string);
};

const wow = {
  a: "wow",
  b: wowee,
};

wow.b("pizza"); //  works fine
wow.c("pizza2222"); // TypeError: wow.c is not a function == this will throw an error
wow[a]; //returns no error
wow[c]; // evaluates to undefined, as wow.c has not been declared
// i can use this falsy evaluation to use a wide net scraper instead of a targeted one

//! which option do i want? - what are the pros and cons of each?

// # run thru targeted scrapers, run each fallback scraper after every unsuccessful attempt
//@ i need to build this so that it will at first attempt to use a predefined scraper based on the prefix
//@ if there is no prefix, or if there is no defined scraper for that prefix, then it should run through
//@ a set of scrapers with wide reach that *should* get most of the outliers

//# run thru targeted, adding unsuccessful skus to a new list,
//@ iterate through the prefixes with their specific scraper, and if unsuccessful, add the sku to a list
//@ after first run through, write the data, and then start again with the wide nets on the unsuccessful list
//* i'm not sure how to preserve the insert order here - writing the first list, then resuming the second list may overwrite the first list
/**
 * scrape, adding good and bad results to results, adding only bad results to a second list
 * when done scraping, write all to sheet
 * iterate over first set of results, scraping only bad results with wide net scrapers
 * update the bad results to hopefully good results
 * write all to sheet  ( keeping initial good results in the list will just overwrite the sheet with identical data)
 * thats how we could maintain the order on the sheet
 *
 * does this really help with performance??
 * i;ll need to scrap everything at least once
 * and multiple times for the initial fails
 * the only difference seems to be the time it takes to get results to the sheet
 */
// there is a limit of 300 read 300 write per minute, which should not be an issue

for (let i = 0; i < SkuCount; i++) {
  try {
    // try scraper[prefiv](seleniumDriver, modelKitInfo)
    // the above will throw an error if there is no scraper for that prefix
  } catch (error) {
    // if the error was thrown because there was no scraper, then return goodSuccessScraperOne()
  }
}

const goodSuccessScraperOne = (info) => {
  try {
    // try scraping the site
    // return good info if successful
    // will throw an error if it is not found on the site being scraped
  } catch (error) {
    // return goodSuccessScraperTwo()
  }
};

const goodSuccessScraperTwo = (info) => {
  try {
    // try scraping the site
    // return good info if successful
    // will throw an error if it is not found on the site being scraped
  } catch (error) {
    // return goodSuccessScraperThree()
  }
};

let result = defined;
for (let i = 0; i < SKU_ARRAY.length; i++) {
  // call scraper on this sku
  let result = scraper();
  if (result.isgood) {
    // if initial scraper was successful, continue to the next sku
    continue;
  } else {
    // if it was not successful, run thru the extras
    for (let j = 0; j < EXTRA_SCRAPER_ARRAY; j++) {
      result = EXTRA_SCRAPER_ARRAY[j]();
      if (result.isgood) {
        // if the result is good, exit the extra scraper loop
        break;
      }
    }
    //last is good check
    if (result.isgood) {
      //push result
    } else {
      // push result with sad message
    }
    //here is worst case scenario
  }
}

//**************************************************************************** */
