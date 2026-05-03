import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

function getBaseURL() {
  let url =
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  return url;
}

export function createAuth() {
  const mongoUri =
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/skillsphere";

  const secret =
    process.env.BETTER_AUTH_SECRET ||
    "skillsphere-super-secret-build-safe-key-123456789";

  const baseURL = getBaseURL();

  const client = new MongoClient(mongoUri);
  const db = client.db("skillsphere");

  return betterAuth({
    database: mongodbAdapter(db),

    secret,
    baseURL,

    emailAndPassword: {
      enabled: true,
    },

    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      },
    },

    trustedOrigins: [
      "http://localhost:3000",
      baseURL,
      process.env.BETTER_AUTH_URL,
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    ].filter(Boolean),
  });
}