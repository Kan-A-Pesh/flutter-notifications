import type { NextFunction, Request, Response } from "express";

abstract class NotificationController {
    static create(req: Request, res: Response, next: NextFunction) {
        try {
            // TODO: Implement create notification

            return res.status(501).json({ message: "Not implemented" });
        } catch (error) {
            next(error);
        }
    }
}

export default NotificationController;
