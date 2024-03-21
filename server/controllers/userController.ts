import type { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

abstract class UserController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;

            // Validate request body
            if (!email || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email) === false) {
                return res.status(400).json({ message: "Invalid email address" });
            }

            // Check if the email already exists
            const user = await client.user.findUnique({
                where: {
                    email,
                },
            });

            if (user) {
                return res.status(409).json({ message: "Email already exists" });
            }

            // Create a new user
            const newUser = await client.user.create({
                data: {
                    email,
                },
            });

            return res.status(201).json({ message: "User created successfully", data: { user: newUser } });
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            // Get all users
            const users = await client.user.findMany();

            return res.status(200).json({ message: "Users found", data: { users } });
        } catch (error) {
            next(error);
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            // Get user by id
            const user = await client.user.findUnique({
                where: {
                    id: id,
                },
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({ message: "User found", data: { user } });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { email } = req.body;

            // Validate request body
            if (!email || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email) === false) {
                return res.status(400).json({ message: "Invalid email address" });
            }

            // Check if the user exists
            const user = await client.user.findUnique({
                where: {
                    id: id,
                },
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if the email already exists
            const targetUser = await client.user.findUnique({
                where: {
                    email,
                },
            });

            if (targetUser) {
                return res.status(409).json({ message: "Email already exists" });
            }

            // Update user by id
            const updatedUser = await client.user.update({
                where: {
                    id: id,
                },
                data: {
                    email,
                },
            });

            return res.status(200).json({ message: "User updated successfully", data: { user: updatedUser } });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            // Check if the user exists
            const user = await client.user.findUnique({
                where: {
                    id: id,
                },
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Delete user by id
            await client.user.delete({
                where: {
                    id: id,
                },
            });

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
