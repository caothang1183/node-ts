import mongoose, { Schema, Document, HookNextFunction } from "mongoose";
import { RoleDocument } from "./role.model";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  activated: boolean;
  role: RoleDocument["_id"];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 8,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
      max: 65,
    },
    password: {
      type: String,
      required: true,
    },
    activated: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next: HookNextFunction) {
  let user = this as UserDocument;
  if (!user.isModified("password")) return next();
  const round = Number(process.env.SALT_PASSWORD);
  const salt = await bcrypt.genSalt(round);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  let user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((error) => false);
};

const User = mongoose.model("User", UserSchema);
export default User;
