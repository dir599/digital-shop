import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../database/prisma";

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    try {
      if (!token) {
        return res.status(401).json({
          message: "Authorization required",
        });
      }
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

      if (typeof decoded === "string" || !("userId" in decoded)) {
        return res.status(401).json({
          message: "Invalid token payload",
        });
      }

      const userId = Number(decoded.userId);

      if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(401).json({
          message: "Invalid token payload",
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "User not found of middleware problem",
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  },
);
