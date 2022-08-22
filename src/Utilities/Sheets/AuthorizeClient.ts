// @ts-nocheck
import { CLIENTINFO, GOOGLEINFO } from "../../config";
import { writeValuesToSheet } from "./SheetWriter";
import { OAuth2Client } from "google-auth-library";
// const destroyer = require("server-destroy");
import destroyer from "server-destroy";
// const fs = require("fs");
import * as fs from "fs";

// const { google } = require("googleapis");
import { google } from "googleapis";

import http from "http";
import url from "url";
import open from "open";

// authorize(data);

// const TOKEN_PATH = "token.json";
export async function authorizeAndWrite(data) {
  // const keys = JSON.parse(process.env["CREDS"]);
  // console.log(process.env);
  const { client_secret, client_id, redirect_uris } = {
    client_secret: CLIENTINFO.clientSecret,
    client_id: CLIENTINFO.clientID,
    redirect_uris: ["http://localhost:3000"],
  };

  // console.log({ pizza });
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris);

  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    // To get a refresh token, you MUST set access_type to `offline`.
    access_type: "offline",
    // set the appropriate scopes
    scope: "https://www.googleapis.com/auth/userinfo.profile",
    // A refresh token is only returned the first time the user
    // consents to providing access.  For illustration purposes,
    // setting the prompt to 'consent' will force this consent
    // every time, forcing a refresh_token to be returned.
    prompt: "consent",
  });
  // http://localhost:3000/?code=4%2F0AdQt8qginu1ne1iMKrJHgGf3xdnhnQRqqhP4_B3AkvGVL8LPD5wv422XotB3nVozKoy4Jw&scope=profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile
  console.log({ authorizeUrl });

  // JSON.parse(GOOGLEINFO.GOOGLE_TOKEN)
  // oAuth2Client.setCredentials(JSON.parse(process.env.SERVICE_ACC_TOKEN));
  //! writeValuesToSheet(oAuth2Client, data);

  // console.log(`client without creds`);
  // console.log(oAuth2Client);
  // console.log(`client with creds`);
  // console.log(oAuth2Client);
  // console.log(`now calling write function`);

  // Check if we have previously stored a token.
  // fs.readFile(TOKEN_PATH, (err, token) => {
  //   // console.log(`first client below`);
  //   // console.log(oAuth2Client);
  //   if (err) return getNewToken(oAuth2Client, () => writeValuesToSheet(oAuth2Client, data));
  //   oAuth2Client.setCredentials(JSON.parse(token));
  //   writeValuesToSheet(oAuth2Client, data);
  //   // console.log(oAuth2Client);
  // });
}

// oAuth2Client.scopes = ["https://www.googleapis.com/auth/cloud-platform"];
// console.log({ oAuth2Client });

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
// function getNewToken(oAuth2Client, callback) {
//   // If modifying these scopes, delete token.json.
//   const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
//   // The file token.json stores the user's access and refresh tokens, and is
//   // created automatically when the authorization flow completes for the first
//   // time.
//   const readline = require("readline");
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: SCOPES,
//   });
//   // if (process.env.GOOGLE_TOKEN) {
//   //   oAuth2Client.setCredentials(process.env.GOOGLE_TOKEN);
//   //   fs.writeFile(TOKEN_PATH, JSON.stringify(process.env.GOOGLE_TOKEN), (err) => {
//   //     if (err) return console.error(err);
//   //     console.log("Token stored to", TOKEN_PATH);
//   //   });
//   //   callback(oAuth2Client);
//   // }
//   console.log("Authorize this app by visiting this url:", authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question("Enter the code from that page here: ", (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error("Error while trying to retrieve access token", err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log("Token stored to", TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }
