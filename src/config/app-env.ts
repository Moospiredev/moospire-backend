import path from "path";
import dotenv from "dotenv";
import { getFileDir, convertToMilliseconds } from "@/utilities/index.js";

// Create __dirname equivalent for ES modules
const __dirname = getFileDir(import.meta.url);

/* Loading the environment variables from the .env file. */
dotenv.config({
  path: path.resolve(__dirname, `../../.env`),
});

const fallbackTokenLife = "1h";
const fallbackOtpLife = "10m";

const safeMilliseconds = (value: string | undefined, fallback: string) => {
  const source = value || fallback;

  try {
    return convertToMilliseconds(source);
  } catch {
    return convertToMilliseconds(fallback);
  }
};

const cookieOptions = {
  httpOnly: true,
  path: "/",
  secure: false,
  sameSite: "lax",
  maxAge: safeMilliseconds(process.env.TOKEN_LIFE, fallbackTokenLife),
};
/* mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@testcluster.urrgt.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority  */  

/* Storing all the environment variables in one place */
const envConfig = {
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  API_VERSION: process.env.API_VERSION || "/api/v1",
  APP_CLIENT_BASE_DOMAIN: process.env.APP_CLIENT_BASE_DOMAIN || "https://example.com",
  APP_ENV: process.env.APP_ENV || "development",
  APP_PORT: process.env.PORT || "3000",
  APP_SECRET: process.env.APP_SECRET || "development-secret-key",

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  FIGMA_CLIENT_ID: process.env.FIGMA_CLIENT_ID,
  FIGMA_CLIENT_SECRET: process.env.FIGMA_CLIENT_SECRET,

  EMAIL_PROVIDER: process.env.EMAIL_PROVIDER,

  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,

  SMTP_SERVICE: process.env.SMTP_SERVICE,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  EMAIL_DOMAIN: process.env.EMAIL_DOMAIN,

  FILE_SIZE_BASE: 5,
  MONGODB_CONNECTION_STRING: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.jd9mx9w.mongodb.net/${process.env.MONGODB_DATABASE}?appName=Cluster0`,

  MORGAN_OUTPUT_FORMAT:
    process.env.APP_ENV === "development"
      ? "[:date[web]] ':method :url' :status :res[content-length] ':user-agent'"
      : ":remote-addr - :remote-user [:date[web]] ':method :url HTTP/:http-version' :status :res[content-length] ':referrer' ':user-agent'",

  PER_PAGE: 5,

  RATE_LIMIT_REQUEST: 1,
  RATE_LIMIT_REQUEST_PER_SECOND: 1000,

  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT || 6379,

  SALT_ROUND: process.env.SALT_ROUND || "10",
  TOKEN_LIFE: process.env.TOKEN_LIFE || fallbackTokenLife,
  OTP_TIME_TO_LIFE: process.env.OTP_TIME_TO_LIFE || fallbackOtpLife,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || "superadmin@moospire.com",

  // NON ENV VARIABLES
  DOMAIN_URL:
    process.env.APP_ENV === "development"
      ? `http://localhost:${process.env.APP_PORT}`
      : "https://moospire-app",

  COOKIE_OPTIONS:
    process.env.APP_ENV === "development"
      ? {
          ...cookieOptions,
          domain: "localhost",
        }
      : {
          ...cookieOptions,
          secure: true,
          sameSite: "none",
        },
};

export default envConfig;
