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

      //@ GOOD DATA
      // const data = await getDates(SKUArray);
      //@ GOOD DATA

      //@ TEST DATA
      let data = [
        {
          SKU: `wow`,
          releaseDateTR: `wow`,
        },
      ];
      //@ TEST DATA

      await writeValuesToSheet(data);

      resolve(`looking good`);

      // const sheets = google.sheets({ version: "v4", auth: client });
      // const values = [["Deez Nutz"]];
      // const resource = { values };

      // // @ts-ignore
      // const result = await sheets.spreadsheets.values.update({
      //     spreadsheetId,
      //     range,
      //     valueInputOption,
      //     resource
      // });
    } catch (error) {
      reject(error);
    }
  });
}
