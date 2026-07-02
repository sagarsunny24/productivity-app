import type { RequestHandler } from "express";
import type { AppError } from "../types/types.d.ts";
const notFound:RequestHandler = (req, res, next) => {

  const error: AppError  = new Error("Not found");
  error.status = 404;
  next(error);
};

export default notFound;
