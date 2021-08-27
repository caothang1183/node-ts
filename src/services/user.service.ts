import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../models/user.model";

const createUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    return await User.create(input);
  } catch (error) {
    throw new Error(error);
  }
};

const validatePassword = async ({ username, password }: { username: UserDocument["username"]; password: string }) => {
  const user = await User.findOne({ username });
  if (!user) return false;
  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return omit(user.toJSON(), "password");
};

const findUser = async (query: FilterQuery<UserDocument>) => {
  try {
    return await User.findOne(query).lean();
  } catch (error) {
    throw new Error(error);
  }
};

const UserService = { createUser, validatePassword, findUser };

export default UserService;
