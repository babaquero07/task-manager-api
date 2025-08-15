import { Router } from "express";
import taskRouter from "./task/task.controller";

const routes = Router();

routes.use("/tasks", taskRouter);

export default routes;
