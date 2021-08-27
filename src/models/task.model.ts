import mongoose, { Schema, Document, HookNextFunction } from "mongoose";
import StringUtils from "../utils/string.utils";
import { UserDocument } from "./user.model";

interface TaskDocument extends Document {
  user: UserDocument["_id"];
  title: string;
  slug: string;
  content: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

TaskSchema.pre("save", async function (next: HookNextFunction) {
  let task = this as TaskDocument;
  task.slug = StringUtils.getSlug(task.title);
  return next();
});

const Task = mongoose.model("Task", TaskSchema);
export { TaskSchema, TaskDocument };
export default Task;
