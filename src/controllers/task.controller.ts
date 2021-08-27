import { Request, Response } from "express";
import { get } from "lodash";
import { TaskService } from "../services";

export const createTaskHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, "user._id");
    const task = await TaskService.createTask({ ...req.body, user: userId });
    return res.status(200).send(task);
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

export const updateTaskHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, "user._id");
    const taskId = get(req, "params.id");
    const task = await TaskService.findTask({ _id: taskId });
    if (!task) return res.status(404).send({ message: "task is not exist" });
    if (String(task.user) !== userId) return res.status(401).send({ message: "can not update task" });
    await TaskService.updateTask({ _id: taskId }, req.body, { new: true });
    return res.status(200).send({ message: "update success" });
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

export const updateTaskStatusHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, "user._id");
    const taskId = get(req, "params.id");
    const task = await TaskService.findTask({ _id: taskId });
    if (!task) return res.status(404).send({ message: "task is not exist" });
    if (String(task.user) !== userId) return res.status(401).send({ message: "can not update task" });
    await TaskService.updateTask({ _id: taskId }, { completed: !task.completed }, { new: true });
    return res.status(200).send({ message: "update status success" });
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

export const getAllTaskHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, "user._id");
    const tasks = await TaskService.findAllTask({ user: userId });
    return res.status(200).send(tasks);
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

export const getTaskHandler = async (req: Request, res: Response) => {
  try {
    const taskId = get(req, "params.id");
    let task = await TaskService.findTask({ slug: taskId });
    if (!task) task = await TaskService.findTask({ _id: taskId });
    if (!task) return res.status(404).send({ message: "task is not exist" });
    return res.status(200).send(task);
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, "user._id");
    const taskId = get(req, "params.id");
    const task = await TaskService.findTask({ taskId });
    if (!task) return res.status(404).send({ message: "task is not exist" });
    if (String(task.user) !== userId) return res.status(401).send({ message: "can not delete task" });
    await TaskService.deleteTask({ taskId });
    return res.status(200).send({ message: "delete success" });
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

const TaskController = {
  createTaskHandler,
  updateTaskHandler,
  getAllTaskHandler,
  getTaskHandler,
  deleteTaskHandler,
  updateTaskStatusHandler,
};
export default TaskController;
