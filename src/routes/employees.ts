import express from "express";
import * as employeesController from "../controllers/employeesController";
// import validate from "../middleware/validate";
// import { registerSchema, loginSchema } from "../validators/authValidators";

const router = express.Router();
router.get("/", employeesController.getEmployees);
router.get("/[id]", employeesController.getEmployeeById);
router.post("/", employeesController.createEmployee);
router.put("/[id]", employeesController.updateEmployee);
router.delete("/[id]", employeesController.updateEmployee);
export default router;
