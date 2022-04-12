import { Router } from "express";
import UserController from "../controllers/users.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middlewares";
import verifyEmailAvailabilityMiddleware from "../middlewares/verifyEmailAvailability.middlewares";

const usersRouter = Router();
const userController = new UserController();

usersRouter.post("", verifyEmailAvailabilityMiddleware, userController.store);
usersRouter.post("/login", userController.index);

usersRouter.use(verifyAuthMiddleware);
usersRouter.get("", userController.index);
usersRouter.get("/profile", userController.show);
usersRouter.patch("/:id", userController.update);
usersRouter.delete("/:id", userController.delete);

export default usersRouter;
