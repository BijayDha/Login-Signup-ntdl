import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDB_URL = process.env.MONGO_DB_URL;
export const connectTO_DB = () => {
  try {
    const connect = mongoose.connect(mongoDB_URL);
    if (connect) {
      console.log("MongoDB connected at" + mongoDB_URL);
    }
  } catch (error) {
    console.log(error);
  }
};
