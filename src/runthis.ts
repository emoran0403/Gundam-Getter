import { google } from "googleapis";
import { getDates } from "./Utilities/selenium/selenium";
import { readSKUsFromSheet } from "./Utilities/Sheets/SheetReader";
import { writeValuesToSheet } from "./Utilities/Sheets/SheetWriter";

const scope = "https://www.googleapis.com/auth/spreadsheets";
const client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "http://localhost:3000");

// const range = "Sheet1!A1";
// const valueInputOption = "USER_ENTERED";
// const spreadsheetId = process.env.SPREADSHEET_ID;

client.on("tokens", (tokens) => {
  const { access_token, refresh_token } = tokens;

  if (access_token) process.env.ACCESS_TOKEN = access_token;
  if (refresh_token) process.env.REFRESH_TOKEN = refresh_token;
});

export default async function dostuff() {
  try {
    if (!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
      const url = client.generateAuthUrl({ access_type: "offline", scope, response_type: "code" });
      console.log({ message: "Click this link to get the initial OAuth2 consent screen", url });
    }

    //* retrieve the SKUs from the sheet
    const rows = await readSKUsFromSheet();
    //* transform the data
    const SKUArray = rows.flat();
    // console.log({ rows, SKUArray });
    // console.log(`data below`);
    const data = await getDates(SKUArray);
    // console.log({ data });
    writeValuesToSheet(client, data);

    // const sheets = google.sheets({ version: "v4", auth: client });
    // const values = [["Deez Nutz"]];
    // const resource = { values };

    // // @ts-ignore
    // const result = await sheets.spreadsheets.values.update({
    //     spreadsheetId,
    //     range,
    //     valueInputOption,
    //     resource
    // });
  } catch (error) {
    console.log((error as any).message);
  }
}

export const checkEmAndStoreEm = async (code: string, scope: string) => {
  const { tokens } = await client.getToken(code);

  const { access_token, refresh_token } = tokens;

  if (access_token) process.env.ACCESS_TOKEN = access_token;
  if (refresh_token) process.env.REFRESH_TOKEN = refresh_token;

  client.setCredentials({ refresh_token });

  return tokens;
};
