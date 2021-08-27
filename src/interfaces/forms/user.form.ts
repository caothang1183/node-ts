import { object, string, ref } from "yup";

export const CreateUserForm = object({
  body: object({
    username: string().required("username is required."),
    email: string().required("e-mail is required."),
    fullname: string().required("fullname is required."),
    password: string()
      .required("password is required.")
      .min(6, "password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-@]*$/, "password can only contain Latin letters."),
    "confirm-password": string()
      .required("confirm-password is required.")
      .oneOf([ref("password"), null], "confirm-password does not match,"),
  }),
});

export const LoginForm = object({
  body: object({
    username: string().required("username is required."),
    password: string()
      .required("password is required.")
      .min(6, "password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-@]*$/, "password can only contain Latin letters."),
  }),
});
