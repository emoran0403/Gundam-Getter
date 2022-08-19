import { GOOGLEINFO } from "./config";
import { authorizeAndWrite } from "./Utilities/Sheets/AuthorizeClient";
import { getDates } from "./Utilities/selenium/selenium";
import { readSKUsFromSheet } from "./Utilities/Sheets/SheetReader";
// const fs = require("fs");
import * as fs from "fs";

export default function dostuff() {
  // "/app/token.json"
  // fs.writeFile(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`, process.env.SERVICE_ACC_TOKEN!, (err: any) => {
  //   console.log(err);
  // });

  readSKUsFromSheet()
    .then((rows) => {
      const SKUArray = rows.flat();
      // this is selenium
      // return getDates(SKUArray);
    })
    .then((data) => {
      // console.log(`SKUResult array following...`);
      // console.log(data);
      console.log(`Now calling writeValuesToSheet with the SKUResult array`);
      //this is real data
      // authorizeAndWrite(data);

      let testdata = `wow`;
      authorizeAndWrite(testdata);
    })
    .catch((err) => {
      console.log(`Error happened lol:`);
      console.log(err);
    })
    .finally(() => {
      // let endtime = Date.now();
      // console.log(endtime);

      console.log(`All Done!`);
    });
}
