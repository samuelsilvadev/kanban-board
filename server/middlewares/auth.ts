import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!config.tokenSecret) {
    throw new Error(
      "Missing required config values to run the authentication middleware"
    );
  }

  try {
    const token = request.cookies.token;

    if (!token) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, config.tokenSecret);

    return next();
  } catch (err) {
    response.status(401).json({ message: "Unauthorized" });
  }
}
