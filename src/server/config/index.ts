import * as dotenv from "dotenv";
dotenv.config();

export const GOOGLEINFO = {
  spreadSheetID: process.env.GOOGLE_SPREADSHEET_ID,
  sheetID: process.env.GOOGLE_SHEET_ID,
  googleApiKey: process.env.GOOGLE_API_KEY,
};

/**
 *This is how we hide the secret info, while still being able to use it
 */
