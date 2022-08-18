// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import doIt from "../../src/runthis";

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    doIt();
    res.status(200).json({ message: "Working on it!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
}
