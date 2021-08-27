import { omit } from "lodash";
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Role, { RoleDocument } from "../models/role.model";

const createRole = async (input: DocumentDefinition<RoleDocument>) => {
  try {
    return await Role.create(input);
  } catch (error) {
    throw new Error(error);
  }
};

const updateRole = async (
  query: FilterQuery<RoleDocument>,
  update: UpdateQuery<RoleDocument>,
  options: QueryOptions
) => {
  try {
    return await Role.updateOne(query, update, options);
  } catch (error) {
    throw new Error(error);
  }
};

const findAllRole = async (query: FilterQuery<RoleDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Role.find(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
};

const findRole = async (query: FilterQuery<RoleDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Role.findOne(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteRole = async (query: FilterQuery<RoleDocument>) => {
  try {
    return await Role.deleteOne(query);
  } catch (error) {
    throw new Error(error);
  }
};

const RoleService = { createRole, updateRole, findRole, deleteRole, findAllRole };

export default RoleService;
