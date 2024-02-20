import { config } from "./config";

export const getAuthParams = () => {
  if (!config.clientId || !config.redirectUrl) {
    throw new Error(
      "Missing required config values to generate auth parameters"
    );
  }

  const parameters = new URLSearchParams();

  parameters.set("client_id", config.clientId);
  parameters.set("redirect_uri", config.redirectUrl);
  parameters.set("response_type", "code");
  parameters.set("scope", "openid profile email");
  parameters.set("access_type", "offline");
  parameters.set("state", "standard_oauth");
  parameters.set("prompt", "consent");

  return parameters.toString();
};

export const getTokenParams = (code: string) => {
  if (!config.clientId || !config.redirectUrl || !config.clientSecret) {
    throw new Error(
      "Missing required config values to generate token parameters"
    );
  }

  const parameters = new URLSearchParams();

  parameters.set("client_id", config.clientId);
  parameters.set("client_secret", config.clientSecret);
  parameters.set("code", code);
  parameters.set("grant_type", "authorization_code");
  parameters.set("redirect_uri", config.redirectUrl);

  return parameters.toString();
};
