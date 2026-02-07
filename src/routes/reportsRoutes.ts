import { Router } from "express";
import { getAttendanceReport } from "../controllers/reportsController";
import authMiddleware from "../middleware/authMiddleware";
const router = Router();

router.use(authMiddleware);
router.get("/attendance", getAttendanceReport);

export default router;
