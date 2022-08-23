import type { NextApiRequest, NextApiResponse } from "next";
import { checkEmAndStoreEm } from "../../src/runthis";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code, scope } = req.query;

    console.log("hit");

    if (!code || typeof code !== "string" || typeof scope !== "string" || !scope) return res.json({ message: "stfu they're defined" });

    checkEmAndStoreEm(code, scope);

    res.json({ scope });
}
