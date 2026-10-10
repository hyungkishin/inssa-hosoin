import { defineConfig } from "@playwright/test";
import local from "./playwright.config";

const baseURL = process.env.DEPLOYMENT_URL;
if (!baseURL || new URL(baseURL).protocol !== "https:") {
  throw new Error("DEPLOYMENT_URL must be an HTTPS deployment URL.");
}

export default defineConfig(local, {
  webServer: undefined,
  timeout: 40000,
  expect: { timeout: 10000 },
  reporter: [
    ["list"],
    ["json", { outputFile: "artifacts/deployment-e2e-results.json" }],
  ],
  use: { ...local.use, baseURL },
});
