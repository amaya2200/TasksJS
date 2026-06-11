import 'dotenv/config';
import type { StringValue } from "ms";

function getEnv(key: string): string {
  const value = process.env[key]

  if (!value) {
    throw new Error(`missing required variable: ${key}`);
  }

  return value;
}

const config = {
    MONGO_URI: getEnv("MONGO_URI"),
    JWT_SECRET: getEnv("JWT_SECRET"),
    JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN || '1h') as StringValue,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    FRONTEND_URL: process.env.FRONTEND_URL,
};

export default config;