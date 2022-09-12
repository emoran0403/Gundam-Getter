import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, scope } = req.query;

  // console.log("hit");

  if (!code || typeof code !== "string" || typeof scope !== "string" || !scope)
    return res.json({ message: "stfu they're defined" });
  res.json({ scope });
}
