import mongoose, { Schema, Document, HookNextFunction } from "mongoose";
import StringUtils from "../utils/string.utils";

interface RoleDocument extends Document {
  id: number;
  slug: string;
  name: string;
  description: string;
}

const RoleSchema = new Schema(
  {
    id: { type: Number, unique: true, min: 1 },
    slug: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

RoleSchema.pre("save", async function (next: HookNextFunction) {
  let role = this as RoleDocument;
  role.slug = StringUtils.getSlug(role.name);
  return next();
});

const Role = mongoose.model("Role", RoleSchema);
export { RoleSchema, RoleDocument };
export default Role;
