import { Request, Response, NextFunction } from "express";
import db from "../config/db";
import sendResponse from "../utils/response";

export const getAttendanceReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { month, employee_id } = req.query;

    if (!month || typeof month !== "string") {
      sendResponse(
        res,
        400,
        false,
        "Query parameter 'month' is required in YYYY-MM format",
      );
      return;
    }

    const [year, mon] = month.split("-").map(Number);
    if (!year || !mon || mon < 1 || mon > 12) {
      sendResponse(res, 400, false, "Invalid month format. Use YYYY-MM");
      return;
    }

    const startDate = `${year}-${String(mon).padStart(2, "0")}-01`;
    const lastDay = new Date(year, mon, 0).getDate();
    const endDate = `${year}-${String(mon).padStart(2, "0")}-${lastDay}`;

    let query = db("employees")
      .select(
        "employees.id as employee_id",
        "employees.name",
        db.raw(
          `COUNT(attendance.id) FILTER (WHERE attendance.date BETWEEN ? AND ?) AS days_present`,
          [startDate, endDate],
        ),
        db.raw(
          `COUNT(attendance.id) FILTER (WHERE attendance.date BETWEEN ? AND ? AND attendance.check_in_time > '09:45:00') AS times_late`,
          [startDate, endDate],
        ),
      )
      .leftJoin("attendance", "employees.id", "attendance.employee_id")
      .groupBy("employees.id", "employees.name")
      .orderBy("employees.name", "asc");

    if (employee_id) {
      query = query.where("employees.id", employee_id);
    }

    const report = await query;

    sendResponse(res, 200, true, "Attendance report", report);
  } catch (err) {
    next(err);
  }
};
