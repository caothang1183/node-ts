import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import JwtUtils from "../utils/jwt.utils";

const verifyAccess = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ message: "token can not define" });
  const accessToken = authorization.replace(/Bearer\s/, "");
  const { decoded } = JwtUtils.decode(accessToken);
  if (get(decoded, "role.id") !== 1) return res.status(401).send({ message: "your account don't have permission" });
  if (!get(decoded, "activated")) return res.status(401).send({ message: "your account hasn't actived yet" });
  next();
};

const AuthMiddleware = {
  verifyAccess,
};

export default AuthMiddleware;
