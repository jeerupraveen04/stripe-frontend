const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const baseEnvPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(baseEnvPath)) {
  dotenv.config({ path: baseEnvPath });
}

const environment = process.env.ENVIRONMENT;

if (!environment) {
  throw new Error("ENVIRONMENT is not defined in .env");
}

const envFile = `.env.${environment}`;
const envFilePath = path.resolve(process.cwd(), envFile);

if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath, override: true });
  console.log(`Loaded ${envFile}`);
} else {
  throw new Error(`Environment file ${envFile} not found`);
}
