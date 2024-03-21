import type { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

abstract class SessionController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;

            // Validate request body
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }

            // Check credentials
            const user = await client.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                return res.status(401).json({ message: "Invalid email" });
            }

            // Create a new session
            const newSession = await client.session.create({
                data: {
                    userId: user.id,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
                },
            });

            return res.status(201).json({
                message: "Session created",
                data: {
                    sessionId: newSession.id,
                    userId: newSession.userId,
                    expiresAt: newSession.expiresAt,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    // static update(req: Request, res: Response) {
    //     // Implement update session logic
    // }

    static delete(req: Request, res: Response, next: NextFunction) {
        try {
            // Delete session
            client.session.delete({
                where: {
                    id: req.sessionId,
                },
            });

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

export default SessionController;
