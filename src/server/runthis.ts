import { getDates } from "./Utilities/selenium/selenium";
import { readSKUsFromSheet } from "./Utilities/Sheets/SheetReader";

export default function dostuff() {
  readSKUsFromSheet()
    .then((rows) => {
      const SKUArray = rows.flat();
      return getDates(SKUArray);
    })
    .then((data) => {
      console.log(data);
      //   return sheetWriterFunction
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log(`should be done now`);
    });
}
