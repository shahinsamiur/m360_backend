import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";
import AppError from "../utils/AppError";

/**
 * Middleware for validating request body using Joi schema
 * @param schema Joi ObjectSchema
 */
const validate =
  (schema: ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const message = error.details.map((d) => d.message).join(", ");
        return next(new AppError(message, 400));
      }

      req.body = value;
      next();
    } catch (err) {
      next(err);
    }
  };

export default validate;
