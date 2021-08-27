import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./user.model";

interface SessionDocument extends Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: {
      type: String,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", SessionSchema);
export { SessionSchema, SessionDocument };
export default Session;
