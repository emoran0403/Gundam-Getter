import * as dotenv from "dotenv";
dotenv.config();

export const GOOGLEINFO = {
  spreadSheetID: process.env.GOOGLE_SHEETS_ID,
  sheetID: process.env.GOOGLE_SHEET_ID,
};

/**
 *This is how we hide the secret info, while still being able to use it
 */
