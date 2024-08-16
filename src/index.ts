import app from "./server";
import * as dotenv from "dotenv";
dotenv.config();

import config from "./config";
app.listen(config.port, () => {
  console.log("hello on http://localhost:3001");
});