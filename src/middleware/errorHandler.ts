import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/response";
import AppError from "../utils/AppError";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return sendResponse(res, statusCode, false, message);
};

export default errorHandler;
