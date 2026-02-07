import { Request, Response, NextFunction } from "express";
import multer from "multer";

const FILE_SIZE_LIMIT = 500 * 1024;

export const multerErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: `File too large. Maximum allowed size is ${FILE_SIZE_LIMIT / 1024} KB.`,
        data: null,
      });
    }
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
      data: null,
    });
  }
  next();
};
