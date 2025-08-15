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

  async getTasks(
    limit: number,
    offset: number,
    status: string | undefined
  ): Promise<{
    count: number;
    pages: number;
    tasks: Task[];
  }> {
    const statusFilter = status
      ? {
          status,
        }
      : {
          status: {
            in: ["pendiente", "en_progreso", "completada"],
          },
        };

    try {
      const tasks = await prisma.task.findMany({
        skip: offset,
        take: limit,
        where: statusFilter,
        orderBy: {
          createdAt: "desc",
        },
      });

      const totalTasks = await prisma.task.count({
        where: statusFilter,
      });

      return {
        count: totalTasks,
        pages: Math.ceil(totalTasks / limit),
        tasks,
      };
    } catch (error) {
      console.log(error);

      throw new Error("Error fetching tasks");
    }
  }
}
