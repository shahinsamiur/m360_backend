import { Request, Response, NextFunction } from "express";
import db from "../config/db";
import sendResponse from "../utils/response";

export const getAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { employee_id, date, start_date, end_date } = req.query;

    let query = db("attendance");

    if (employee_id) query = query.where("employee_id", employee_id);
    if (date) query = query.where("date", date);
    if (start_date && end_date)
      query = query.whereBetween("date", [start_date, end_date]);

    const attendance = await query.select("*").orderBy("date", "desc");

    sendResponse(res, 200, true, "Attendance fetched successfully", attendance);
  } catch (err) {
    next(err);
  }
};

export const getAttendanceById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const attendance = await db("attendance").where({ id }).first();

    if (!attendance) {
      sendResponse(res, 404, false, "Attendance entry not found");
      return;
    }

    sendResponse(res, 200, true, "Attendance fetched successfully", attendance);
  } catch (err) {
    next(err);
  }
};

export const createOrUpdateAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { employee_id, date, check_in_time } = req.body;

    const [attendance] = await db("attendance")
      .insert({
        employee_id,
        date,
        check_in_time,
        created_at: db.fn.now(),
        updated_at: db.fn.now(),
      })
      .onConflict(["employee_id", "date"])
      .merge({
        check_in_time,
        updated_at: db.fn.now(),
      })
      .returning(["id", "employee_id", "date", "check_in_time"]);

    sendResponse(
      res,
      200,
      true,
      "Attendance upserted successfully",
      attendance,
    );
  } catch (err) {
    next(err);
  }
};

export const updateAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { employee_id, date, check_in_time } = req.body;

    // 1️⃣ Fetch current record
    const attendance = await db("attendance").where({ id }).first();
    if (!attendance) {
      sendResponse(res, 404, false, "Attendance entry not found");
      return;
    }

    // 2️⃣ Check for unique conflict (exclude current row)
    const conflict = await db("attendance")
      .where({ employee_id, date })
      .whereNot({ id })
      .first();

    if (conflict) {
      sendResponse(
        res,
        409,
        false,
        "Attendance already exists for this employee and date",
      );
      return;
    }

    // 3️⃣ Update the record
    const [updatedAttendance] = await db("attendance")
      .where({ id })
      .update({
        employee_id,
        date,
        check_in_time,
        updated_at: db.fn.now(),
      })
      .returning(["id", "employee_id", "date", "check_in_time"]);

    // 4️⃣ Send response
    sendResponse(res, 200, true, "Attendance updated", updatedAttendance);
  } catch (err) {
    next(err);
  }
};

export const deleteAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const attendance = await db("attendance").where({ id }).first();
    if (!attendance) {
      sendResponse(res, 404, false, "Attendance entry not found");
      return;
    }

    await db("attendance").where({ id }).del();

    sendResponse(res, 200, true, "Attendance deleted");
  } catch (err) {
    next(err);
  }
};
