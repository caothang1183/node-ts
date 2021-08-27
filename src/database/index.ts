import mongoose from "mongoose";
import log from "../logger";

const connect = () => {
  const url = process.env.DB_URL as string;

  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("Connect database error");
      log.error(error);
      process.exit(1);
    });
};

const database = {
  connect,
};

export default database;
