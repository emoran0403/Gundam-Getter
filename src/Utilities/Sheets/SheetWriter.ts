import { GOOGLEINFO } from "../../config";
import { google } from "googleapis";

// const google = google()
interface SKUResult {
  SKU: string;
  releaseDateTR: string;
}

/**
 * This function writes the release date values to the sheet.
 * @param authClient An authorized client.
 * @param webScrapedData The array of SKUResult objects.
 */ //@ts-ignore
export const writeValuesToSheet = async (webScrapedData: SKUResult[]) => {
  //* transform incoming data into writable format
  let goodData: string[][] = [];
  webScrapedData.forEach((SKUResult) => {
    let cell = [SKUResult.releaseDateTR];
    goodData.push(cell);
  });

  //@ make the auth client
  const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
  const auth = new google.auth.GoogleAuth({ keyFile: "./serviceaccountcreds.json", scopes });

  //* define the api service by calling google.sheets with the credentials
  const service = google.sheets({ version: "v4", auth });

  // requestBody data here
  const requestBody = {
    values: goodData,
  };

  // test data here
  // let values = [[`more checks`]];
  // const resource = {
  //   values,
  // };

  //* define the required by the spreadsheets API
  const spreadsheetId = GOOGLEINFO!.spreadSheetID;
  const range = "Sheet1!B5:B";
  const valueInputOption = `USER_ENTERED`;

  try {
    //* await the results of updating the sheet with the given parameters
    const result = await service.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption,
      requestBody,
    });

    //* if there was a result, log a message
    if (result) {
      console.log(`Sheet has been updated`);
    }
    // return result;
  } catch (err) {
    //* if there were any errors, log a message
    console.log(err);
  }
};
