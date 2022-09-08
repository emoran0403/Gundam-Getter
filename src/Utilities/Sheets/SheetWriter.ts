import { GOOGLEINFO } from "../../config";
import { checkEmAndStoreEm } from "../../runthis";
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
export const writeValuesToSheet = async (authClient, webScrapedData: SKUResult[], hasRerun: boolean = false) => {
  //* import define google
  const { google } = require("googleapis");

  //* transform incoming data into writable format
  let goodData: string[][] = [];
  webScrapedData.forEach((SKUResult) => {
    let cell = [SKUResult.releaseDateTR];
    goodData.push(cell);
  });

  // cannot use an api key to write to sheets, need to use Oauth
  // const { GoogleAuth } = require("google-auth-library");
  // const auth = new GoogleAuth({ scopes: "https://www.googleapis.com/auth/spreadsheet" });

  //@ make the auth client
  const scope = "https://www.googleapis.com/auth/spreadsheets";
  const client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  //* define the api service by calling google.sheets with the credentials
  const service = google.sheets({ version: "v4", auth: client });

  // real data here
  const resource = {
    values: goodData,
  };

  // test data here
  // let values = [[`more ch3eckds`]];
  // const resource = {
  //   values,
  // };

  //* define the required by the spreadsheets API
  const spreadsheetId = GOOGLEINFO!.spreadSheetID;
  const range = "SKUHERE!B5:B";
  const valueInputOption = `USER_ENTERED`;
  console.log(`auth client below`);
  // console.log({ service });
  // console.log(JSON.stringify(service, null, 2));

  console.log({
    REFRESHTOKEN: process.env.REFRESH_TOKEN,
    ACCESSTOKEN: process.env.ACCESS_TOKEN,
    AUTHCLIENT: authClient,
  });
  try {
    //* await the results of updating the sheet with the given parameters
    const result = await service.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });
    // console.log(`should see a result below`);
    // console.log(result);

    // console.log("%d cells updated.", result.data.updatedCells);
    //* if there was a result, log a message
    if (result) {
      console.log(`Sheet has been updated`);
    }
    // return result;
  } catch (err) {
    //* if there were any errors, log a message
    console.log(err);

    //@ the recursive stuff
    // if (!hasRerun) {
    //   checkEmAndStoreEm(process.env.CODE!);

    //   writeValuesToSheet(authClient, webScrapedData, true);
    // }
  }
};
