import dotenv from "dotenv";
dotenv.config();
import express from "express";
import log from "./logger";
import cors from "cors";
import database from "./database";
import initRoutes from "./routes";
import { SessionMiddleware } from "./middlewares";

const PORT = process.env.PORT;
const app = express();
app.use(SessionMiddleware.deserializeUser);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  log.info(`Server is running on port:${PORT}`);
  database.connect();
  initRoutes(app);
});
