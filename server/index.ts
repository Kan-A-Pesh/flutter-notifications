import express from "express";

import sessionRouter from "./routes/session";
import channelsRouter from "./routes/channels";
import usersRouter from "./routes/users";
import groupsRouter from "./routes/groups";
import notificationsRouter from "./routes/notifications";

import checkAdminApiKey from "./middlewares/checkAdminApiKey";

// https://stackoverflow.com/a/71126179
declare module "express-serve-static-core" {
    interface Request {
        sessionId?: string;
        userId?: string;
    }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/session", sessionRouter);
app.use("/channels", channelsRouter);
app.use("/users", checkAdminApiKey, usersRouter);
app.use("/groups", checkAdminApiKey, groupsRouter);
app.use("/notifications", checkAdminApiKey, notificationsRouter);

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
