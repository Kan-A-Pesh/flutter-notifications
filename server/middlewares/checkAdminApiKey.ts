import { Request, Response, NextFunction } from "express";

// Middleware to check if the admin has the right API-KEY in the headers
const checkAdminApiKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["X-API-KEY"] as string;

    // Check if the API-KEY header is present and valid
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    next();
};

export default checkAdminApiKey;
