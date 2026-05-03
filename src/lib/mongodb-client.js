import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

let client;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
  }

  client = global._mongoClient;
} else {
  client = new MongoClient(uri);
}

export const mongoClient = client;
export const db = client.db("skillsphere");