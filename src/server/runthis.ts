import { GOOGLEINFO } from "./config";
import { getDates } from "./Utilities/selenium/selenium";
import { readSKUsFromSheet } from "./Utilities/Sheets/SheetReader";
import { writeValuesToSheet } from "./Utilities/Sheets/SheetWriter";

export default function dostuff() {
  readSKUsFromSheet()
    .then((rows) => {
      const SKUArray = rows.flat();
      return getDates(SKUArray);
    })
    .then((data) => {
      console.log(`SKUResult array following...`);
      console.log(data);
      console.log(`Now calling writeValuesToSheet with the KUResult array`);

      return writeValuesToSheet(data);
    })
    .catch((err) => {
      console.log(`Error happened lol:`);
      console.log(err);
    })
    .finally(() => {
      console.log(`All Done!`);
    });
}
