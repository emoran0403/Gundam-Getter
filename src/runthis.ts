import { google } from "googleapis";
import { getDates } from "./Utilities/selenium/selenium";
import { readSKUsFromSheet } from "./Utilities/Sheets/SheetReader";
import { writeValuesToSheet } from "./Utilities/Sheets/SheetWriter";

export default async function dostuff() {
  return new Promise(async (resolve, reject) => {
    try {
      //* retrieve the SKUs from the sheet
      const rows = await readSKUsFromSheet();

      //* transform the data by flattening the rows...
      const RawSKUArray = rows.flat();
      let niceSKUArray: string[] = [];
      console.log(RawSKUArray);

      //* ...transform the data and remove the prefix
      RawSKUArray.forEach((rawSKU) => {
        // niceSKU is the part of the rawSKU after the dash
        const niceSKU = rawSKU.split("-")[1];

        // if the data is undefined, push the raw data
        if (!niceSKU) {
          niceSKUArray.push(rawSKU);
        } else {
          // otherwise, push the SKU
          niceSKUArray.push(niceSKU);
        }
      });

      console.log(niceSKUArray);
      //* this runs the selenium scraper
      const data = await getDates(niceSKUArray);

      await writeValuesToSheet(data);

      resolve(`looking good`);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
