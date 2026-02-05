import { Response } from "express";

/**
 * Standard API response
 * @param res - Express response object
 * @param status - HTTP status code
 * @param success - boolean success/fail
 * @param message - string message
 * @param data - optional payload
 */
const sendResponse = (
  res: Response,
  status: number,
  success: boolean,
  message: string,
  data: any = null,
): Response => {
  return res.status(status).json({
    success,
    message,
    data,
  });
};

export default sendResponse;
