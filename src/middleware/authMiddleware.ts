import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../config/db";
import AppError from "../utils/AppError";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  }
}

interface TokenPayload extends JwtPayload {
  id: number;
  role: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized: token missing", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as TokenPayload;

    const users = await db("hr_users")
      .select("id", "name", "email")
      .where("id", decoded.id);

    if (users.length === 0) {
      throw new AppError("User not found", 404);
    }

    req.user = users[0];

    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Token expired", 401));
    } else if (err.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", 401));
    } else {
      return next(err);
    }
  }
};

export default authMiddleware;
