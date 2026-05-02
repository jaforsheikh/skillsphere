import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

function getBaseURL() {
  const url =
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://${url}`;
}

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/skillsphere";

const BETTER_AUTH_SECRET =
  process.env.BETTER_AUTH_SECRET ||
  "skillsphere-build-safe-secret-123456789123456789";

const BASE_URL = getBaseURL();

const client = new MongoClient(MONGODB_URI);
const db = client.db("skillsphere");

const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

const socialProviders = {};

if (googleClientId && googleClientSecret) {
  socialProviders.google = {
    clientId: googleClientId,
    clientSecret: googleClientSecret,
  };
}

export function createAuth() {
  return betterAuth({
    database: mongodbAdapter(db),

    secret: BETTER_AUTH_SECRET,
    baseURL: BASE_URL,

    emailAndPassword: {
      enabled: true,
    },

    socialProviders,

    trustedOrigins: [
      "http://localhost:3000",
      BASE_URL,
      process.env.BETTER_AUTH_URL,
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    ].filter(Boolean),
  });
}