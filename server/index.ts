import "dotenv/config";
import jsonServer from "json-server";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import jwt from "jsonwebtoken";
import { getAuthParams, getTokenParams } from "./authUtils";
import { authMiddleware } from "./middlewares/auth";
import { NextFunction, Request, Response } from "express";

const server = jsonServer.create();
const router = jsonServer.router(
  path.join(process.cwd(), "database", "db.json")
);
const middlewares = jsonServer.defaults();
const NON_AUTHENTICATED_PATHS = ["/auth/url", "/auth/token"];

server.use(
  cors({
    origin: [config.clientUrl],
    credentials: true,
  })
);
server.use(cookieParser());
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((request: Request, response: Response, next: NextFunction) => {
  if (NON_AUTHENTICATED_PATHS.includes(request.path)) {
    next();
  } else {
    authMiddleware(request, response, next);
  }
});

server.get("/auth/url", (_request: Request, response: Response) => {
  try {
    response.json({
      url: `${config.authUrl}?${getAuthParams()}`,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

type AuthTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: "Bearer";
  id_token: string;
};

server.get("/auth/token", async (request: Request, response: Response) => {
  const { code } = request.query;

  if (!code) {
    return response
      .status(400)
      .json({ message: "Authorization code must be provided" });
  }

  try {
    const tokenParameters = getTokenParams(code.toString());
    const exchangeAuthCodeResponse = await fetch(
      `${config.tokenUrl}?${tokenParameters}`,
      {
        method: "POST",
      }
    );

    if (!exchangeAuthCodeResponse.ok) {
      throw new Error(exchangeAuthCodeResponse.statusText);
    }

    const parsedResponse: AuthTokenResponse =
      await exchangeAuthCodeResponse.json();

    const { id_token } = parsedResponse;

    if (!id_token || !config.tokenSecret) {
      return response.status(400).json({ message: "Auth error" });
    }

    const decodedToken = jwt.decode(id_token);

    if (!decodedToken || typeof decodedToken === "string") {
      return response.status(400).json({ message: "Auth error" });
    }

    const user = decodedToken;
    const token = jwt.sign({ user }, config.tokenSecret, {
      expiresIn: config.tokenExpirationSeconds,
    });

    response.cookie("token", token, {
      maxAge: config.tokenExpirationMilliseconds,
      httpOnly: true,
    });

    response.json({
      user,
    });
  } catch (error) {
    response.status(500).json({ message: error.message || "Server error" });
  }
});

server.use(router);

server.listen(3001, () => {
  console.log("Server is running on: http://localhost:3001");
});
