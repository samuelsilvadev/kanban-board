import "dotenv/config";

const ONE_HOUR_IN_SECONDS = 60 * 60;

export const config = {
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  redirectUrl: process.env.REDIRECT_URL,
  clientUrl: process.env.CLIENT_URL,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenExpirationSeconds: ONE_HOUR_IN_SECONDS,
  tokenExpirationMilliseconds: ONE_HOUR_IN_SECONDS * 1000,
  postUrl: "https://jsonplaceholder.typicode.com/posts",
};
