// @ts-nocheck
import { CLIENTINFO } from "../../config";
import { writeValuesToSheet } from "./SheetWriter";
const fs = require("fs");

const { google } = require("googleapis");

// authorize(data);

// http://localhost:3000/?code=4/0AdQt8qhAx5v0u9JekSI1zTcay_efe_na_smDnzisffNK8vO_nZ8-M7JIePaHfBtL2lKJDA&scope=https://www.googleapis.com/auth/spreadsheets

export function authorizeAndWrite(data) {
  const TOKEN_PATH = "token.json";
  let wow = { client_secret: CLIENTINFO.clientSecret, client_id: CLIENTINFO.clientID, redirect_uris: ["http://localhost:3000"] };
  const { client_secret, client_id, redirect_uris } = wow;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, () => writeValuesToSheet(oAuth2Client, data));
    oAuth2Client.setCredentials(JSON.parse(token));
    writeValuesToSheet(oAuth2Client, data);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  // If modifying these scopes, delete token.json.
  const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const readline = require("readline");
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error while trying to retrieve access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
