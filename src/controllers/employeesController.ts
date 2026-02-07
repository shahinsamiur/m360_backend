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
    const users = await db("employees").select(
      "id",
      "name",
      "designation",
      "photo_path",
    );

    sendResponse(res, 200, true, "fetch successful", users);
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
    const employee = await db("employees")
      .select(
        "id",
        "name",
        "age",
        "designation",
        "hiring_date",
        "date_of_birth",
        "salary",
        "photo_path",
        "created_at",
      )
      .where("id", req.params.id);
    const employeeAttendance = await db("attendance").where(
      "id",
      req.params.id,
    );
    let employeeData = {
      user_info: employee[0],
      attendanceInfo: employeeAttendance,
    };
    sendResponse(
      res,
      200,
      true,
      "Employee Data Fetch successful",
      employeeData,
    );
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
    const user = await db("employees")
      .select("id", "name", "email")
      .where("id", req.params.id);

    sendResponse(res, 200, true, "Employee Account Created successful", user);
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
    const user = await db("employees")
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
    await db("employees").where("id", req.params.id).delete();

    sendResponse(res, 200, true, "user deleted");
  } catch (error) {
    next(error);
  }
};
