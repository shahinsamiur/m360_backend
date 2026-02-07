import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(18).required(),
  designation: Joi.string().required(),
  hiring_date: Joi.date().required(),
  date_of_birth: Joi.date().required(),
  salary: Joi.number().precision(2).required(),
  photo_path: Joi.string().optional(),
});

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(18).required(),
  designation: Joi.string().required(),
  hiring_date: Joi.date().required(),
  date_of_birth: Joi.date().required(),
  salary: Joi.number().precision(2).required(),
  photo_path: Joi.string().optional(),
});
