// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import doIt from "../../src/runthis";

type Data = {
  message: string;
  url?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    await doIt();
    res.status(200).json({ message: "Working on it!" });
  } catch (err) {
    const error = err as { message: string };
    // console.log(`error message below lol`);
    // console.log(error.message);

    if (error?.message?.includes("//") && !error?.message?.includes("geckodriver")) {
      res.status(202).json({ message: "redirecting", url: error.message });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  }
}
