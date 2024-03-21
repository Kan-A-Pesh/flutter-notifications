import express from "express";
import GroupController from "../controllers/groupController";

const groupsRouter = express.Router();

groupsRouter.post("/", GroupController.create);
groupsRouter.get("/", GroupController.getAll);
groupsRouter.get("/:group_id", GroupController.getOne);
groupsRouter.put("/:group_id", GroupController.update);
groupsRouter.delete("/:group_id", GroupController.delete);
groupsRouter.post("/:group_id/users", GroupController.addUsers);
groupsRouter.delete("/:group_id/users", GroupController.removeUsers);

export default groupsRouter;
