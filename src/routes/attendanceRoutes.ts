import express from "express";

import * as attendanceController from "../controllers/attendanceController";
import validate from "../middleware/validate";
import { attendanceSchema } from "../validators/attendanceValidators";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
router.use(authMiddleware);
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
