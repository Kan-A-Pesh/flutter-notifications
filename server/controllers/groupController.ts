import type { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

abstract class GroupController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;

            // Validate request body
            if (!name) {
                return res.status(400).json({ message: "Name is required" });
            }

            // Check if the group already exists
            const existingGroup = await client.group.findFirst({
                where: {
                    name,
                },
            });
            if (existingGroup) {
                return res.status(409).json({ message: "Group already exists" });
            }

            // Create a new group
            const newGroup = await client.group.create({
                data: {
                    name,
                },
            });

            return res.status(201).json({ message: "Group created successfully", group: newGroup });
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            // Get all groups
            const groups = await client.group.findMany();

            return res.status(200).json({ groups });
        } catch (error) {
            next(error);
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { group_id } = req.params;

            // Check if the group exists
            const existingGroup = await client.group.findUnique({
                where: {
                    id: group_id,
                },
            });

            if (!existingGroup) {
                return res.status(404).json({ message: "Group not found" });
            }

            // Get group by id
            const group = await client.group.findUnique({
                where: {
                    id: group_id,
                },
            });

            return res.status(200).json({ group });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { group_id } = req.params;
            const { name } = req.body;

            // Validate request body
            if (!name) {
                return res.status(400).json({ message: "Name is required" });
            }

            // Check if the group exists
            const existingGroup = await client.group.findUnique({
                where: {
                    id: group_id,
                },
            });
            if (!existingGroup) {
                return res.status(404).json({ message: "Group not found" });
            }

            // Check if the group already exists
            const existingGroupByName = await client.group.findFirst({
                where: {
                    name,
                },
            });
            if (existingGroupByName) {
                return res.status(409).json({ message: "Group already exists" });
            }

            // Update group
            const updatedGroup = await client.group.update({
                where: {
                    id: group_id,
                },
                data: {
                    name,
                },
            });

            return res.status(200).json({ message: "Group updated successfully", group: updatedGroup });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { group_id } = req.params;

            // Check if the group exists
            const existingGroup = await client.group.findUnique({
                where: {
                    id: group_id,
                },
            });
            if (!existingGroup) {
                return res.status(404).json({ message: "Group not found" });
            }

            // Delete group
            const deletedGroup = await client.group.delete({
                where: {
                    id: group_id,
                },
            });

            return res.status(200).json({ message: "Group deleted successfully", group: deletedGroup });
        } catch (error) {
            next(error);
        }
    }

    static async addUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { group_id } = req.params;
            const { users } = req.body;

            // Check if the group exists
            const existingGroup = await client.group.findUnique({
                where: {
                    id: group_id,
                },
            });

            if (!existingGroup) {
                return res.status(404).json({ message: "Group not found" });
            }

            // Check if the users exist
            const existingUsers = await client.user.findMany({
                where: {
                    id: {
                        in: users,
                    },
                },
            });

            if (existingUsers.length !== users.length) {
                return res.status(404).json({ message: "Some users not found" });
            }

            // Check if the users are already in the group
            const existingUserGroup = await client.userGroup.findMany({
                where: {
                    groupId: group_id,
                    userId: {
                        in: users,
                    },
                },
            });

            if (existingUserGroup.length > 0) {
                return res.status(409).json({ message: "Some users are already in the group" });
            }

            // Add users to group
            const addedUsers = users.map(async (user: string) => {
                return await client.userGroup.create({
                    data: {
                        userId: user,
                        groupId: group_id,
                    },
                });
            });

            return res.status(200).json({ message: "Users added to group successfully", users: addedUsers, group: existingGroup });
        } catch (error) {
            next(error);
        }
    }

    static async removeUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { group_id } = req.params;
            const { users } = req.body;

            // Check if the group exists
            const existingGroup = await client.group.findUnique({
                where: {
                    id: group_id,
                },
            });
            if (!existingGroup) {
                return res.status(404).json({ message: "Group not found" });
            }

            // Check if the users exist
            const existingUsers = await client.user.findMany({
                where: {
                    id: {
                        in: users,
                    },
                },
            });
            if (existingUsers.length !== users.length) {
                return res.status(404).json({ message: "Some users not found" });
            }

            // Check if the users are in the group
            const existingUserGroup = await client.userGroup.findMany({
                where: {
                    groupId: group_id,
                    userId: {
                        in: users,
                    },
                },
            });
            if (existingUserGroup.length !== users.length) {
                return res.status(404).json({ message: "Some users are not in the group" });
            }

            // Remove users from group
            const removedUsers = users.map(async (user: string) => {
                return await client.userGroup.deleteMany({
                    where: {
                        userId: user,
                        groupId: group_id,
                    },
                });
            });

            return res.status(200).json({ message: "Users removed from group successfully", users: removedUsers, group: existingGroup });
        } catch (error) {
            next(error);
        }
    }
}

export default GroupController;
