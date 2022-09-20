import { google } from "googleapis";
import { launchSelenium } from "./Utilities/selenium/selenium";
import { readSKUsFromSheet } from "./Utilities/Sheets/SheetReader";
import { writeValuesToSheet } from "./Utilities/Sheets/SheetWriter";
import * as Types from "../Types";

export default async function dostuff() {
  return new Promise(async (resolve, reject) => {
    try {
      //* retrieve the SKUs from the sheet
      const rows = await readSKUsFromSheet();

      //* transform the data by flattening the rows...
      const RawSKUArray = rows.flat();
      let ModelKitArray: Types.ModelKit[] = [];
      // console.log(`raw sku array next`);
      // console.log(RawSKUArray);

      //* ...transform the data and remove the prefix
      RawSKUArray.forEach((rawSKU) => {
        // Prefix is the letters before the dash, SKU is the number after the dash
        const modelPrefix = rawSKU.split("-")[0];
        const modelSKU = Number(rawSKU.split("-")[1]);

        // if the data is undefined, push the raw data
        if (!modelSKU || !modelPrefix) {
          ModelKitArray.push({ scrapable: false, rawSKU: rawSKU, prefix: "", SKU: -1 });
        } else {
          // otherwise, we have good data, so push the SKU
          ModelKitArray.push({ scrapable: true, rawSKU: rawSKU, prefix: modelPrefix, SKU: modelSKU });
        }
      });

      // console.log(`nice sku array next`);
      // console.log(ModelKitArray);
      //* this runs the selenium scraper
      const data = await launchSelenium(ModelKitArray);

      await writeValuesToSheet(data);

      resolve(`looking good`);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
