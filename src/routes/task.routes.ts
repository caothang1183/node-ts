import { CreateTaskForm, UpdateTaskForm, GetTaskForm, DeleteTaskForm } from "../interfaces/forms";
import { SessionMiddleware } from "../middlewares";
import validateRequest from "../validations/request.validate";
import Router from "express";
import { TaskController } from "../controllers";

const taskRoutes = Router();
taskRoutes.post(
  "/api/tasks",
  [SessionMiddleware.requiresUser, validateRequest(CreateTaskForm)],
  TaskController.createTaskHandler
);

taskRoutes.put(
  "/api/tasks/:id",
  [SessionMiddleware.requiresUser, validateRequest(UpdateTaskForm)],
  TaskController.updateTaskHandler
);

taskRoutes.put("/api/tasks/status/:id", SessionMiddleware.requiresUser, TaskController.updateTaskStatusHandler);

taskRoutes.get("/api/tasks", TaskController.getAllTaskHandler);

taskRoutes.get(
  "/api/tasks/:id",
  [SessionMiddleware.requiresUser, validateRequest(GetTaskForm)],
  TaskController.getTaskHandler
);

taskRoutes.delete(
  "/api/tasks/:id",
  [SessionMiddleware.requiresUser, validateRequest(DeleteTaskForm)],
  TaskController.deleteTaskHandler
);
export default taskRoutes;
