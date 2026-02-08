import { Request, Response, NextFunction } from "express";
import db from "../config/db";

import fs from "fs";
import path from "path";
import sendResponse from "../utils/response";

const Base_URL: string = process.env.BASE_URL || "http://localhost:5000";
export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { search, name, page, limit } = req.query;

    let query = db("employees").whereNull("deleted_at");

    const term = (search || name) as string;
    if (term) {
      query = query.where("name", "ilike", `%${term}%`);
    }

    const pageNumber = page ? Number(page) : 1;
    const pageSize = limit ? Number(limit) : 10;
    const offset = (pageNumber - 1) * pageSize;

    const totalQuery = query.clone();
    const totalResult = await totalQuery
      .count<{ count: string }>("* as count")
      .first();
    const total = Number(totalResult?.count || 0);

    const users = await query
      .select("id", "name", "designation", "photo_path")
      .orderBy("name", "asc")
      .limit(pageSize)
      .offset(offset);

    sendResponse(res, 200, true, "Fetch successful", {
      total,
      Base_URL,
      page: pageNumber,
      limit: pageSize,
      data: users,
    });
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
    if (employee.length === 0) {
      sendResponse(res, 404, false, "Employee Not Found");
      return;
    }
    let employeeData = {
      Base_URL,
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
    const { name, age, designation, hiring_date, date_of_birth, salary } =
      req.body;

    const photo_path = req.file ? req.file.filename : null;

    const [employee] = await db("employees")
      .insert({
        name,
        age,
        designation,
        hiring_date,
        date_of_birth,
        salary,
        photo_path,
      })
      .returning("*");

    res.status(201).json({
      status: "success",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employeeId = req.params.id;
    const { name, age, designation, hiring_date, date_of_birth, salary } =
      req.body;

    let photo_path = null;
    if (req.file) {
      const oldEmployee = await db("employees")
        .select("photo_path")
        .where("id", employeeId)
        .first();
      if (oldEmployee.length === 0) {
        sendResponse(res, 404, false, "Employee Not Found");
        return;
      }
      if (oldEmployee?.photo_path) {
        const oldFilePath = path.join(
          __dirname,
          "../uploads",
          oldEmployee.photo_path,
        );
        if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
      }
      photo_path = req.file.filename;
    }

    const [updatedEmployee] = await db("employees")
      .where({ id: employeeId })
      .update({
        name,
        age,
        designation,
        hiring_date,
        date_of_birth,
        salary,
        photo_path,
      })
      .returning("*");

    if (!updatedEmployee) {
      sendResponse(res, 404, false, "Employee not found");
      return;
    }
    sendResponse(
      res,
      200,
      true,
      "Employee updated successfully",
      updatedEmployee,
    );
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
    const employeeId = req.params.id;

    // Soft delete employee
    const [deletedEmployee] = await db("employees")
      .where({ id: employeeId })
      .update({ deleted_at: db.fn.now() })
      .returning("*");

    if (!deletedEmployee) {
      sendResponse(res, 404, false, "Employee not found");
      return;
    }

    sendResponse(
      res,
      200,
      true,
      "Employee soft-deleted successfully",
      deletedEmployee,
    );
  } catch (error) {
    next(error);
  }
};
