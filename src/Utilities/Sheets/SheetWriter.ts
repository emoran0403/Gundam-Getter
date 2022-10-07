import { GOOGLEINFO } from "../../config";
import { google } from "googleapis";
import * as Types from "../../../Types";
// const google = google()
interface SKUResult {
  SKU: string;
  releaseDateTR: string;
}

/**
 * This function writes the release date values to the sheet.
 * @param authClient An authorized client.
 * @param ModelKitResult The array of SKUResult objects.
 */ //@ts-ignore
export const writeValuesToSheet = async (ModelKitResult: Types.ModelKitResult[]) => {
  //* transform incoming data into writable format

  let releaseDateData: string[][] = [];
  let scrapedDateData: string[][] = [];

  ModelKitResult.forEach((Result) => {
    releaseDateData.push([Result.releaseDate]);
    scrapedDateData.push([Result.scrapedDate]);
  });

  //@ make the auth client
  const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
  const auth = new google.auth.GoogleAuth({ keyFile: "./serviceaccountcreds.json", scopes });

  //* define the api service by calling google.sheets with the credentials
  const service = google.sheets({ version: "v4", auth });

  // requestBody data here
  const requestBody_ReleaseDates = {
    values: releaseDateData,
  };

  const requestBody_ScrapedDates = {
    values: scrapedDateData,
  };

  // test data here
  // let values = [[`more checks`]];
  // const resource = {
  //   values,
  // };

  //* define the required by the spreadsheets API
  const spreadsheetId = "13doZtU-apPVwpVs4yKRUvo1RLzIzmpD9OWjBQp946KA";
  const range_ReleaseDates = "Sheet1!B5:B";
  const range_ScrapedDates = "Sheet1!C5:C";
  const valueInputOption = `USER_ENTERED`;

  //* await the results of updating the release dates
  try {
    const result = await service.spreadsheets.values.update({
      spreadsheetId,
      range: range_ReleaseDates,
      valueInputOption,
      requestBody: requestBody_ReleaseDates,
    });

    //* if there was a result, log a message
    if (result) {
      console.log(`Updated Release Dates`);
    }
    // return result;
  } catch (err) {
    //* if there were any errors, log a message
    console.log(err);
  }

  //* await the results of updating the sheet with today's date
  try {
    const result = await service.spreadsheets.values.update({
      spreadsheetId,
      range: range_ScrapedDates,
      valueInputOption,
      requestBody: requestBody_ScrapedDates,
    });

    //* if there was a result, log a message
    if (result) {
      console.log(`Updated Today's Dates`);
    }
    // return result;
  } catch (err) {
    //* if there were any errors, log a message
    console.log(err);
  }
};
