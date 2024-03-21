import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

// Middleware to check if the user is authenticated
const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = bearerToken.split(" ")[1];

    try {
        const session = await client.session.findUnique({
            where: {
                id: token,
            },
        });

        // Check if the session exists and is not expired
        if (!session || new Date() > session.expiresAt) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.userId = session.userId;
        req.sessionId = session.id;
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    return next();
};

export default authenticateUser;
