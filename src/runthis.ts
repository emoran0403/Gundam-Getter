import { google } from "googleapis";
import { getDates } from "./Utilities/selenium/selenium";
import { readSKUsFromSheet } from "./Utilities/Sheets/SheetReader";
import { writeValuesToSheet } from "./Utilities/Sheets/SheetWriter";

export default async function dostuff() {
  return new Promise(async (resolve, reject) => {
    try {
      //* retrieve the SKUs from the sheet
      const rows = await readSKUsFromSheet();
      //* transform the data
      const SKUArray = rows.flat();

      //* this runs the selenium scraper
      const data = await getDates(SKUArray);

      await writeValuesToSheet(data);

      resolve(`looking good`);
    } catch (error) {
      reject(error);
    }
  });
}
