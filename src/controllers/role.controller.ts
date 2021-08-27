import { Request, Response } from "express";
import { get } from "lodash";
import RoleService from "../services/role.service";

export const createRoleHandler = async (req: Request, res: Response) => {
  try {
    const role = await RoleService.createRole({ ...req.body });
    return res.status(200).send(role);
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

export const updateRoleHandler = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

export const getAllRoleHandler = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

export const getRoleHandler = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

export const deleteRoleHandler = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

const RoleController = {
  createRoleHandler,
  updateRoleHandler,
  getAllRoleHandler,
  getRoleHandler,
  deleteRoleHandler,
};
export default RoleController;
