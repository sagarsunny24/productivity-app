import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import type { RequestHandler } from "express";
import { fetchRefreshToken } from "../models/usersModel.js";

interface TokenPayload extends JwtPayload {
  userId: string;
}
export const handleRefreshToken: RequestHandler = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return next({ status: 401, message: "Unauthorized" });

  // console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  // console.log("Refresh Token is: ",refreshToken)
  const foundUser = await fetchRefreshToken(refreshToken);
  // console.log("Found User is", foundUser)
  if (!foundUser) return next({ status: 403,message:"User not found" });
  const refreshKey = process.env.REFRESH_TOKEN_SECRET as string;
  jwt.verify(
    refreshToken,
    refreshKey,
    (
      err: jwt.VerifyErrors | null,
      decoded: jwt.JwtPayload | string | undefined,
    ) => {
      if (err || !decoded)
        return next({ status: 403, message: "Invalid Access" });
      const payload = decoded as TokenPayload;
      if (err || foundUser.userid !== payload.userId)
        return next({ status: 403, message: "Invalid Access" });
      const accessKey = process.env.ACCESS_TOKEN_SECRET as string;
      const accessToken = jwt.sign({ userId: foundUser.userid }, accessKey, {
        expiresIn: "1d",
      });
      res.json({ accessToken });
    },
  );
};

//evaluate password
