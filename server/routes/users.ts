import express from "express";
import UserController from "../controllers/userController";

const usersRouter = express.Router();

usersRouter.post("/", UserController.create);
usersRouter.get("/", UserController.getAll);
usersRouter.get("/:user_id", UserController.getOne);
usersRouter.put("/:user_id", UserController.update);
usersRouter.delete("/:user_id", UserController.delete);

export default usersRouter;
