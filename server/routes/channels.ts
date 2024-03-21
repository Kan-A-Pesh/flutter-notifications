import express from "express";
import ChannelController from "../controllers/channelController";
import authenticateUser from "../middlewares/authenticateUser";

const channelRouter = express.Router();

channelRouter.post("/", authenticateUser, ChannelController.create);
channelRouter.delete("/:channel_id", ChannelController.delete);

export default channelRouter;
