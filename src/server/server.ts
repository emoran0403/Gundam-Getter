import * as express from "express";
import apiRouter from "./routes";

const app = express();

app.use(express.static("public"));
app.use(apiRouter);

//! for testing purposes
// side-loading - basically an immediately imvoked function expression
// import "./selenium/selenium";
// import "./Utilities/Sheets/SheetReader";
// import notspphagetti from "./runthis";
// notspphagetti();

import "./GoogleAuth/Auth";

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
