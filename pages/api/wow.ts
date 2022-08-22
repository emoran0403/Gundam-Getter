// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import http from "http";
import url from "url";
import open from "open";
import { resolve } from "path";
import { OAuth2Client } from "google-auth-library";
import { CLIENTINFO, GOOGLEINFO } from "../../src/config";

type Data = {
  message: string;
};
const { client_secret, client_id, redirect_uris } = {
  client_secret: CLIENTINFO.clientSecret,
  client_id: CLIENTINFO.clientID,
  redirect_uris: "http://localhost:3000",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris);
  try {
    const qs = new url.URL(req.url!, "http://localhost:3000/api/wow").searchParams;
    const code = qs.get("code");
    console.log(`Code is ${code}`);
    res.end("Authentication successful! Please return to the console.");

    // Now that we have the code, use that to acquire tokens.
    const r = await oAuth2Client.getToken(code!);
    // Make sure to set the credentials on the OAuth2 client.
    oAuth2Client.setCredentials(r.tokens);
    console.info("Tokens acquired.");

    res.json(oAuth2Client);

    // res.status(200).json({ message: "Working on it!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
}
