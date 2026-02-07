import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db";
import AppError from "../utils/AppError";
import sendResponse from "../utils/response";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const users = await db("hr_users")
      .select("id", "name", "email", "password_hash")
      .where("email", email);

    if (users.length === 0) {
      throw new AppError("Invalid email or password", 401);
    }

    const user = users[0];
    // console.log(user);
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, 200, true, "Login successful", {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
