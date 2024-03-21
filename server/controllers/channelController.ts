import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

abstract class SessionController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { channel } = req.body;
            const userId = req.userId as string;

            // Validate request body
            if (!channel) {
                return res.status(400).json({ message: "Channel is required" });
            }

            // Check if the channel already exists
            const existingChannel = await prisma.pushChannel.findFirst({
                where: {
                    id: channel,
                },
            });

            if (existingChannel) {
                return res.status(409).json({ message: "Channel already exists" });
            }

            // Generate a secure key for the channel
            const secureKey = Math.random().toString(36).substring(2, 15);

            // Create a new push channel using Prisma
            const newChannel = await prisma.pushChannel.create({
                data: {
                    id: channel,
                    key: secureKey,
                    userId: userId,
                },
            });

            res.status(201).send({ message: "Channel created successfully", data: { channel: newChannel } });
        } catch (error) {
            next(error);
        }
    }

    static async clear(req: Request, res: Response, next: NextFunction) {
        try {
            // Delete all push channels for the current user
            await prisma.pushChannel.deleteMany({
                where: {
                    userId: req.userId as string,
                },
            });

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            // Delete a specific push channel
            const channelId = req.params.channel_id;
            const { key } = req.body;
            const userId = req.userId as string;

            // Check if the channel exists
            const existingChannel = await prisma.pushChannel.findFirst({
                where: {
                    id: channelId,
                    key: key,
                    userId: userId,
                },
            });
            if (!existingChannel) {
                return res.status(404).json({ message: "Channel not found" });
            }

            // Delete the channel using Prisma
            await prisma.pushChannel.delete({
                where: {
                    id: channelId,
                    key: key,
                },
            });

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

export default SessionController;
