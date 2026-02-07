import express from "express";

import * as attendanceController from "../controllers/attendanceController";
import validate from "../middleware/validate";
import { attendanceSchema } from "../validators/attendanceValidators";

const router = express.Router();

router.get("/", attendanceController.getAttendance);

router.get("/:id", attendanceController.getAttendanceById);

router.post(
  "/",
  validate(attendanceSchema),
  attendanceController.createOrUpdateAttendance,
);

router.put(
  "/:id",
  validate(attendanceSchema),
  attendanceController.updateAttendance,
);

router.delete("/:id", attendanceController.deleteAttendance);

export default router;
