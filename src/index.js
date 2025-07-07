import express from "express";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import { connectDb } from "./lib/db.js";

configDotenv();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/", router);

app.listen(5001, () => {
  console.log("Server is started");
  connectDb();
});
