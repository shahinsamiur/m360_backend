import express from "express";
import * as employeesController from "../controllers/employeesController";
import authMiddleware from "../middleware/authMiddleware";
import upload from "../middleware/upload";
import validate from "../middleware/validate";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../validators/employeesValidators";

const router = express.Router();

router.use(authMiddleware);
router.get("/", employeesController.getEmployees);
router.get("/:id", employeesController.getEmployeeById);
router.post(
  "/",
  upload.single("photo_path"),
  validate(createEmployeeSchema),
  employeesController.createEmployee,
);
router.put(
  "/:id",
  upload.single("photo_path"),
  validate(updateEmployeeSchema),
  employeesController.updateEmployee,
);
router.delete("/:id", employeesController.updateEmployee);
export default router;
