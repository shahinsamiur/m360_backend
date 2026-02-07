// validators/attendanceValidators.js
import Joi from "joi";

// Common schema for creating/updating attendance
export const attendanceSchema = Joi.object({
  employee_id: Joi.number().integer().positive().required().messages({
    "any.required": "Employee ID is required",
    "number.base": "Employee ID must be a number",
    "number.integer": "Employee ID must be an integer",
    "number.positive": "Employee ID must be a positive number",
  }),
  date: Joi.date().iso().required().messages({
    "any.required": "Date is required",
    "date.base": "Date must be a valid date",
    "date.format": "Date must be in ISO format (YYYY-MM-DD)",
  }),
  check_in_time: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/) // HH:MM or HH:MM:SS 24h format
    .required()
    .messages({
      "any.required": "Check-in time is required",
      "string.pattern.base":
        "Check-in time must be in HH:MM or HH:MM:SS 24-hour format",
    }),
});
