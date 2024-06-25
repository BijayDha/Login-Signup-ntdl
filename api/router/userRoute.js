import express from "express";
import { authenticateUser, createUser } from "../mongodb/model/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const userCredentials = { email: email, password: password, name: name };

    if (!email || !password) {
      return res.json({ message: "failed", reason: "Invalid Credentials " });
    }
    const result = await createUser(userCredentials);
    if (result) {
      res.json({ message: "success", data: result });
    } else {
      res.json({
        message: "failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredentials = { email: email, password: password };

    if (!email || !password) {
      return res.json({ message: "failed", reason: "Invalid Credentials " });
    }

    const result = await authenticateUser(userCredentials);
    if (result) {
      // generate jwt token

      const accessToken = jwt.sign(
        userCredentials,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        userCredentials,
        process.env.REFRESH_TOKEN_SECRET
      );

      res.json({
        message: "success",
        data: result,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.json({
        message: "failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default userRouter;
