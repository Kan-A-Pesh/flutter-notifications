import express from "express";
import NotificationController from "../controllers/notificationController";

const notificationsRouter = express.Router();

notificationsRouter.post("/", NotificationController.create);

export default notificationsRouter;
