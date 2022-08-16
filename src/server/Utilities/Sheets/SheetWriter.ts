import { GOOGLEINFO } from "../../config";
import * as Types from "../../../../Types";

export const writeValuesToSheet = async (webScrapedData: Types.SKUResult[]) => {
  // assign values to properties
  const spreadsheetId = GOOGLEINFO!.spreadSheetID;
  const range = "SKUHERE!B5:B6";
  const valueInputOption = `USER_ENTERED`;

  // transform incoming data into writable format
  //   let goodData: string[][] = [];
  //   webScrapedData.forEach((SKUResult) => {
  //     let cell = [SKUResult.releaseDateTR];
  //     goodData.push(cell);
  //   });

  // cannot use an api key to write to sheets, need to use Oauth
  const { GoogleAuth } = require("google-auth-library");
  const { google } = require("googleapis");
  const auth = new GoogleAuth({ scopes: "https://www.googleapis.com/auth/spreadsheet" });

  const service = google.sheets({ version: "v4", auth });

  // test data here
  const resource = {
    values: [["value 1"], [" value 2"]],
  };
  //   let values = goodData;
  //   const resource = {
  //     values,
  //   };

  try {
    const result = service.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });

    // console.log("%d cells updated.", result.data.updatedCells);
    console.log(result);
    // return result;
  } catch (err) {
    console.log(err);
  }
};
