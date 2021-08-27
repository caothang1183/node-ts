import { omit } from "lodash";
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Task, { TaskDocument } from "../models/task.model";

const createTask = async (input: DocumentDefinition<TaskDocument>) => {
  try {
    return await Task.create(input);
  } catch (error) {
    throw new Error(error);
  }
};

const updateTask = async (
  query: FilterQuery<TaskDocument>,
  update: UpdateQuery<TaskDocument>,
  options: QueryOptions
) => {
  try {
    return await Task.updateOne(query, update, options);
  } catch (error) {
    throw new Error(error);
  }
};

const findAllTask = async (query: FilterQuery<TaskDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Task.find(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
};

const findTask = async (query: FilterQuery<TaskDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Task.findOne(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTask = async (query: FilterQuery<TaskDocument>) => {
  try {
    return await Task.deleteOne(query);
  } catch (error) {
    throw new Error(error);
  }
};

const TaskService = { createTask, updateTask, findTask, deleteTask, findAllTask };

export default TaskService;
