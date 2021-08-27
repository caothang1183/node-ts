import jwt from "jsonwebtoken";
import log from "../logger";

 const sign = (object: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, String(process.env.SECRET_KEY), options);
};

 const decode = (token: string) => {
  try {
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
    return { valid: true, expired: false, decoded };
  } catch (error) {
    log.error(error.message);
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};

const JwtUtils = {
  sign,
  decode
};

export default JwtUtils;
