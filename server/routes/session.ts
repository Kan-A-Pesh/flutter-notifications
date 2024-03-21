import express from "express";
import SessionController from "../controllers/sessionController";
import authenticateUser from "../middlewares/authenticateUser";

const sessionRouter = express.Router();

sessionRouter.post("/", SessionController.create);
// sessionRouter.put("/", authenticateUser, SessionController.update);
sessionRouter.delete("/", authenticateUser, SessionController.delete);

export default sessionRouter;
