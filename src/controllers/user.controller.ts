import { Request, Response } from "express";
import { get, omit } from "lodash";
import { SessionService, UserService } from "../services";
import jwtUtils from "../utils/jwt.utils";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await UserService.validatePassword(req.body);
    if (!user) return res.status(401).send("Invalid username or password");
    const session = await SessionService.createSession(user._id, req.get("user-agent") || "");
    const accessToken = SessionService.createAccessToken({ user, session });
    const refreshToken = jwtUtils.sign(session, { expiresIn: process.env.REFRESH_TOKEN_EXPIRED });
    return res.status(200).send({ accessToken, refreshToken });
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

export const logoutUserHandler = async (req: Request, res: Response) => {
  try {
    const sessionId = get(req, "user.session");
    await SessionService.updateSession({ _id: sessionId }, { valid: false });
    return res.status(200).send({ message: "update success" });
  } catch (error) {
    return res.status(403).send(error.message);
  }
};

export const getUserSessionHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, "user._id");
    const sessions = await SessionService.findSession({ user: userId, valid: true });
    return res.status(200).send({ data: sessions });
  } catch (error) {
    return res.status(403).send(error.message);
  }
};

const UserController = {
  createUserHandler,
  loginUserHandler,
  logoutUserHandler,
  getUserSessionHandler,
};
export default UserController;
