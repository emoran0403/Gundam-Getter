// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import NC from "next-connect";

import "../../src/Middlewares/GPassport";

passport.initialize();

const handler = NC().get(
  passport.authenticate(`google`, { session: false }, (req, res) => {
    console.log(`i have authenticated`);
    res.status(200).json({ message: "Working on it!" });
  })
);

export default handler;
