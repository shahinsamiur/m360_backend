import express from "express";
import * as authController from "../controllers/authController";
import validate from "../middleware/validate";
import { loginSchema } from "../validators/authValidators";

const router = express.Router();

router.post("/", validate(loginSchema), authController.login);

export default router;
