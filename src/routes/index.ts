import { Express, Request, Response } from "express-serve-static-core";
import userRoutes from "./user.routes";
import taskRoutes from "./task.routes";
import roleRoutes from "./role.routes";

const initRoutes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => res.status(200).send({ message: "Welcome to Api" }));
  app.use(userRoutes);
  app.use(taskRoutes);
  app.use(roleRoutes);
};

export default initRoutes;
