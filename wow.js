const wowee = (string) => {
  console.log(string);
};

const wow = {
  a: "wow",
  b: wowee,
};

wow.b("pizza"); //  works fine
wow.c("pizza2222"); // TypeError: wow.c is not a function == this will throw an error

//! which option do i want? - what are the pros and cons of each?

// # run thru prefixes, run each broad scraper after every unsuccessful attempt
//@ i need to build this so that it will at first attempt to use a predefined scraper based on the prefix
//@ if there is no prefix, or if there is no defined scraper for that prefix, then it should run through
//@ a set of scrapers with wide reach that *should* get most of the outliers

//# run thru prefixes, adding unsuccessful skus to a new list,
//@ iterate through the prefixes with their specific scraper, and if unsuccessful, add the sku to a list
//@ after first run through, write the quick data, and then start again with the wide nets on the unsuccessful list

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
