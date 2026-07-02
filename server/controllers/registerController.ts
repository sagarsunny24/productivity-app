import bcrypt from "bcrypt";
import { type RequestHandler } from "express";
// import crypto from "crypto";
import { createNewUser } from "../models/usersModel.js";
import type { AppError } from "../types/types.d.ts";
import type { UserBody } from "../types/types.d.ts";
import { v4 as uuidv4 } from "uuid";



export const registerUser: RequestHandler =async(req, res, next)=>{
  const { user, pwd } = req.body as UserBody;
  console.log(req.body)
  if (!user || !pwd)
    return next({
      status: 400,
      message: "Username and password are required",
    } satisfies AppError);
  try {
    //encrypt the password
    const hashedPswrd = await bcrypt.hash(pwd, 10);
    const newUser = {
      username: user,
      password: hashedPswrd,
      userId: uuidv4()
    };

    await createNewUser(newUser);
    res.status(201).json({ success: `new user ${user} created` });
  } catch (error : unknown) {
     if (typeof error === "object" && error !== null && "code" in error){
if (error.code === "23505") {
      return next({
        status: 409,
        message: "User already exists",
      } satisfies AppError);
    }

    
    }
    next(error);
  }
}
