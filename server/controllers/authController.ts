import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import type { RequestHandler } from "express";

import { addRefreshToken, validateUser } from "../models/usersModel.js";
import type { LoginCredential, UserBody } from "../types/types.d.ts";

export const handleLogin:RequestHandler = async (req, res, next) :Promise< string | void> => {
  try {
    const { user, pwd } :UserBody = req.body;

    if (!user || !pwd)
      return next({
        status: 400,
        message: "Username and password are required",
      });
    const userRecord : LoginCredential | null = await validateUser(user);

    if (!userRecord) return next({ status: 404, message: "User not found" }); //unauthorized

    //evaluate password
    const match = await bcrypt.compare(pwd, userRecord.password_hash);
    if (match) {
      //create JWTs
      const accessKey =process.env.ACCESS_TOKEN_SECRET as string
      const accessToken = jwt.sign(
        { userId: userRecord.userid },
        accessKey,
        { expiresIn: "1d" },
      );
      const refreshKey = process.env.REFRESH_TOKEN_SECRET as string
      const refreshToken = jwt.sign(
        { userId: userRecord.userid },
        refreshKey,
        { expiresIn: "1d" },
      );
      console.log(accessToken)
      res.cookie('jwt',refreshToken,{httpOnly:true,sameSite: 'none',secure: true,maxAge:604800000})
      res.status(200).json({
        accessToken: accessToken
      });
      
      const userId = userRecord.userid
      await addRefreshToken({userId,refreshToken})
    } else {
      return next({ status: 401, message: "Invalid password" });
    }
  } catch (error) {
    next(error);
  }
}
