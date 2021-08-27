import { CreateRoleForm, DeleteRoleForm, GetRoleForm, UpdateRoleForm } from "../interfaces/forms";
import { SessionMiddleware } from "../middlewares";
import validateRequest from "../validations/request.validate";
import Router from "express";
import { RoleController } from "../controllers";

const roleRoutes = Router();
roleRoutes.post("/api/roles", validateRequest(CreateRoleForm), RoleController.createRoleHandler);

roleRoutes.put(
  "/api/roles/:id",
  [SessionMiddleware.requiresUser, validateRequest(UpdateRoleForm)],
  RoleController.updateRoleHandler
);
roleRoutes.get("/api/roles", RoleController.getAllRoleHandler);
roleRoutes.get(
  "/api/roles/:id",
  [SessionMiddleware.requiresUser, validateRequest(GetRoleForm)],
  RoleController.getRoleHandler
);
roleRoutes.delete(
  "/api/roles/:id",
  [SessionMiddleware.requiresUser, validateRequest(DeleteRoleForm)],
  RoleController.deleteRoleHandler
);

export default roleRoutes;
