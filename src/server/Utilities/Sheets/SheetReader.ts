import { google } from "googleapis";
import { GOOGLEINFO } from "../../config";

/**
 * This function reads from the google sheet and returns an array of SKUs.
 * @returns Returns an array of SKUs read from the google sheet.
 */
export const readSKUsFromSheet = async () => {
  //* define the api service by calling google.sheets with the credentials
  const service = google.sheets({ version: "v4", auth: GOOGLEINFO.googleApiKey });
  //* return a new promise that will resolve with an array of SKUs
  return new Promise<string[][]>((resolve, reject) => {
    //* instruct service to retrieve the specified data from the sheet
    service.spreadsheets.values.get(
      {
        spreadsheetId: GOOGLEINFO.spreadSheetID,
        range: "SKUHERE!A5:A",
      },
      (err, res) => {
        //* if there was an error, log it and reject the promise
        if (err) {
          console.log("The API returned an error: " + err);
          reject(err);
        }

        //* define the rows to be returned
        const rows = res!.data.values;

        //* if there are rows, resolve with the rows
        if (rows!.length) {
          // console.log(`rows below:`);
          // console.log(rows);
          resolve(rows!);
        } else {
          //* otherwise, log and reject with a message
          console.log("No data found.");
          reject("No data found.");
        }
      }
    );
  });
};
