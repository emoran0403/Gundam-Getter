import readline from "readline";
import { google } from "googleapis";
import { GOOGLEINFO } from "../../config";

const sheets = google.sheets({ version: "v4", auth: GOOGLEINFO.googleApiKey });

export const readSKUsFromSheet = async () => {
  return new Promise<string[][]>((resolve, reject) => {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: GOOGLEINFO.spreadSheetID,
        range: "SKUHERE!A5:A6",
      },
      (err, res) => {
        if (err) {
          console.log("The API returned an error: " + err);
          reject(err);
        }

        const rows = res!.data.values;

        if (rows!.length) {
          // console.log(`rows below:`);
          // console.log(rows);
          resolve(rows!);
        } else {
          console.log("No data found.");
          reject("No data found.");
        }
      }
    );
  });
};

// console.log({ GOOGLEINFO });
