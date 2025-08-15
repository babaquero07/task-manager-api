import { NextFunction, Request, Response } from "express";
import {
  body,
  param,
  query,
  ValidationChain,
  validationResult,
} from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);

      if (!result.isEmpty()) {
        break;
      }
    }

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(422).json({ errors: errors.array() });
  };
};

export const registerTaskValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("status")
    .optional()
    .isIn(["pendiente", "en_progreso", "completada"])
    .withMessage(
      "Status must be either 'pendiente', 'en_progreso', or 'completada'"
    ),
  body("priority")
    .optional()
    .isInt({ min: 1, max: 3 })
    .withMessage("Priority must be an integer between 1 and 3"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid ISO 8601 date"),
];

export const getTasksValidator = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be an integer between 1 and 100"),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be an integer greater than or equal to 0"),
  query("status")
    .optional()
    .isIn(["pendiente", "en_progreso", "completada"])
    .withMessage(
      "Status must be either 'pendiente', 'en_progreso', or 'completada'"
    ),
];

export const getTaskValidator = [
  param("id").isInt().withMessage("ID must be an integer"),
];

export const updateTaskValidator = [
  param("id").isInt().withMessage("ID must be an integer"),
  body("title").optional().isString().withMessage("Title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("status")
    .optional()
    .isIn(["pendiente", "en_progreso", "completada"])
    .withMessage(
      "Status must be either 'pendiente', 'en_progreso', or 'completada'"
    ),
  body("priority")
    .optional()
    .isInt({ min: 1, max: 3 })
    .withMessage("Priority must be an integer between 1 and 3"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid ISO 8601 date"),
];
