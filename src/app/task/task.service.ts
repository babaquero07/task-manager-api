import prisma from "../../lib/prisma";
import { Task } from "./task.interface";

export class TaskService {
  async createTask(task: Task): Promise<Task> {
    try {
      const newTask = await prisma.task.create({
        data: task,
      });

      return newTask;
    } catch (error) {
      console.log(error);

      throw new Error("Error creating task");
    }
  }
}
