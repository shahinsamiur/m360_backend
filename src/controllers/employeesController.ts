import { Request, Response, NextFunction } from "express";
import db from "../config/db";
// import AppError from "../utils/AppError";
import sendResponse from "../utils/response";

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await db("users").select("id", "name", "email", "role");

    sendResponse(res, 200, true, "Login successful", users);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await db("users")
      .select("id", "name", "email", "role")
      .where("id", req.params.id);

    sendResponse(res, 200, true, "Login successful", user);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await db("users")
      .select("id", "name", "email", "role")
      .where("id", req.params.id);

    sendResponse(res, 200, true, "Login successful", user);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await db("users")
      .select("id", "name", "email", "role")
      .where("id", req.params.id);

    sendResponse(res, 200, true, "Login successful", user);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await db("users").where("id", req.params.id).delete();

    sendResponse(res, 200, true, "user deleted");
  } catch (error) {
    next(error);
  }
};
