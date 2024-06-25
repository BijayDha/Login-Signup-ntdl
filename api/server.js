import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectTO_DB } from "./config/dbConfig.js";
import taskRouter from "./router/taskRoute.js";
import cors from "cors";
import userRouter from "./router/userRoute.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

//connection to database | MongoDB
connectTO_DB();

// Define CORS options
const corsOptions = {
  credentials: true,
  origin: true,
};

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/tasks", taskRouter);
app.use("/api/user", userRouter);

// start the server
app.listen(port, (error) => {
  error
    ? console.log("server didn't started", error)
    : console.log("Your server is running in http://localhost:" + port);
});
