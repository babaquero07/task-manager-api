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

// model Task {
//   id          Int       @id @default(autoincrement())
//   title       String
//   description String?
//   status      String    @default("pendiente")
//   priority    Int       @default(3)
//   dueDate     DateTime?
//   createdAt   DateTime  @default(now())
//   updatedAt   DateTime  @updatedAt
// }

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
