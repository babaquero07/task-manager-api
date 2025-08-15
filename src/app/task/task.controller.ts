import { Request, Response, Router } from "express";
import { TaskService } from "./task.service";
import type { Task } from "./task.interface";
import {
  getTasksValidator,
  getTaskValidator,
  registerTaskValidator,
  updateTaskValidator,
  validate,
} from "../../utils/validators";

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

taskRouter.get(
  "/",
  validate(getTasksValidator),
  async (req: Request, res: Response) => {
    try {
      const { limit, offset, status } = req.query;

      const data = await taskService.getTasks(
        limit ? +limit : 5,
        offset ? +offset : 0,
        status ? (status as string) : undefined
      );

      return res.status(200).send({
        ok: true,
        message: "Tasks fetched successfully",
        ...data,
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

taskRouter.get(
  "/:id",
  validate(getTaskValidator),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = await taskService.getTask(+id);
      if (!task) {
        return res.status(404).send({
          ok: false,
          message: "Task not found",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "Task fetched successfully",
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

taskRouter.patch(
  "/:id",
  validate(updateTaskValidator),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = await taskService.getTask(+id);
      if (!task) {
        return res.status(404).send({
          ok: false,
          message: "Task not found",
        });
      }

      const updatedTask = await taskService.updateTask(+id, req.body);

      return res.status(200).send({
        ok: true,
        message: "Task updated successfully",
        task: updatedTask,
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
