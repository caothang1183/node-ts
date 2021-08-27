import { Omit, get } from "lodash";
import { FilterQuery, LeanDocument, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import JwtUtils from "../utils/jwt.utils";
import { UserService } from "./";

const createSession = async (userId: string, userAgent: string) => {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
};

const updateSession = async (query: FilterQuery<UserDocument>, update: UpdateQuery<SessionDocument>) => {
  try {
    return await Session.updateOne(query, update);
  } catch (error) {
    throw new Error(error);
  }
};

const findSession = async (query: FilterQuery<UserDocument>) => {
  try {
    return await Session.find(query).lean();
  } catch (error) {
    throw new Error(error);
  }
};

const createAccessToken = ({
  user,
  session,
}: {
  user: any | LeanDocument<Omit<UserDocument, "password">> | Omit<UserDocument, "password">;
  session: any | LeanDocument<Omit<SessionDocument, "password">> | Omit<SessionDocument, "password">;
}) => {
  const accessToken: string = JwtUtils.sign(
    { ...user, session: session._id },
    {
      expiresIn: process.env.TOKEN_EXPIRED,
    }
  );
  return accessToken;
};

const renewAccessToken = async ({ refreshToken }: { refreshToken: string }) => {
  const { decoded } = JwtUtils.decode(refreshToken);
  if (!decoded || !get(decoded, "_id")) return false;
  const session = await Session.findById(get(decoded, "_id"));
  if (!session || !session?.valid) return false;
  const user = await UserService.findUser({ _id: session.user });
  if (!user) return false;
  const accessToken = createAccessToken({ user, session });
  return accessToken;
};

const SessionService = {
  createSession,
  createAccessToken,
  renewAccessToken,
  updateSession,
  findSession,
};

export default SessionService;
