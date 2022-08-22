// @ts-nocheck
import { CLIENTINFO, GOOGLEINFO } from "../../config";
import { writeValuesToSheet } from "./SheetWriter";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

// const TOKEN_PATH = "token.json";
export async function authorizeAndWrite(data) {
  axios
    .get("http://localhost:3000/api/wow")
    .then((res) => {
      // console.log(`data below`);
      // console.log(res.data);
      // console.log({ res });
      console.log(`i am here`);
    })
    .catch((err) => {
      console.log(err);
    });

  // const keys = JSON.parse(process.env["CREDS"]);
  // console.log(process.env);
  // const { client_secret, client_id, redirect_uris } = {
  //   client_secret: CLIENTINFO.clientSecret,
  //   client_id: CLIENTINFO.clientID,
  //   redirect_uris: ["http://localhost:3000"],
  // };
  // console.log({ pizza });
  // const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris);
  // Generate the url that will be used for the consent dialog.
  // const authorizeUrl = oAuth2Client.generateAuthUrl({
  //   access_type: "offline",
  //   scope: "https://www.googleapis.com/auth/userinfo.profile",
  //   prompt: "consent",
  // });
  // console.log({ authorizeUrl });
  //! writeValuesToSheet(oAuth2Client, data);
}
