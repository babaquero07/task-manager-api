import { Request, Response, Router } from "express";
import { TaskService } from "./task.service";
import type { Task } from "./task.interface";
import { registerTaskValidator, validate } from "../../utils/validators";

const taskService = new TaskService();
const taskRouter = Router();

taskRouter.post(
  "/",
  validate(registerTaskValidator),
  async (req: Request, res: Response) => {
    try {
      const task = await taskService.createTask({
        ...req.body,
      });

      return res.status(201).send({
        ok: true,
        message: "Task created successfully",
        task,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).send({
        ok: false,
        message: "Internal server error",
      });
    }
  }
);

export default taskRouter;
