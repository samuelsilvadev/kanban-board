import { defineConfig } from "cypress";
import "dotenv/config";
import codeCoverage from "@cypress/code-coverage/task";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CLIENT_URL,
    viewportWidth: 1024,
    viewportHeight: 768,
    setupNodeEvents(on, config) {
      codeCoverage(on, config);
      return config;
    },
    video: false,
  },
});
