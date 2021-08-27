import { UserController } from "../controllers";
import { CreateUserForm, LoginForm } from "../interfaces/forms";
import { SessionMiddleware } from "../middlewares";
import validateRequest from "../validations/request.validate";
import Router from "express";

const userRoutes = Router();
userRoutes.post("/api/register", validateRequest(CreateUserForm), UserController.createUserHandler);
userRoutes.post("/api/login", validateRequest(LoginForm), UserController.loginUserHandler);
userRoutes.get("/api/sessions", SessionMiddleware.requiresUser, UserController.getUserSessionHandler);
userRoutes.delete("/api/logout", SessionMiddleware.requiresUser, UserController.logoutUserHandler);

export default userRoutes;
