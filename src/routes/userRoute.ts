import express from "express";
import * as authController from "../controllers/authController";
import validate from "../middleware/validate";
import { registerSchema, loginSchema } from "../validators/authValidators";

const router = express.Router();

router.post("/login", validate(loginSchema), authController.login);

export default router;
