import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import log from "../logger";
import { SessionService } from "../services";
import JwtUtils from "../utils/jwt.utils";

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const { headers } = req;
  const accessToken = headers.authorization?.replace(/Bearer\s/, "");
  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) return next();
  const { decoded, expired } = JwtUtils.decode(accessToken);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;

    return next();
  }
  if (expired && refreshToken) {
    const newAccessToken = await SessionService.renewAccessToken({ refreshToken });
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const { decoded } = JwtUtils.decode(newAccessToken);
      if (decoded) log.info("renew token success");
      // @ts-ignore
      req.user = decoded;
    }
    return next();
  }
  return next();
};

export const requiresUser = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const user = get(req, "user");
  if (!user) return res.status(403).send({ message: "user is not found" });
  return next();
};

const SessionMiddleware = {
  deserializeUser,
  requiresUser,
};

export default SessionMiddleware;