import * as express from "express";
import doIt from "../server/runthis";

const router = express.Router();

router.get("/gundamget", async (req, res) => {
  try {
    doIt();
    res.status(200).json({ message: "Working on it!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
});

export default router;
