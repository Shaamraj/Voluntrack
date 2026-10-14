import mongoose from "mongoose";
import { env } from "./env.js";

// Optional for now: the API intentionally runs in memory while MONGO_URI is empty.
export async function connectDatabase() {
  if (!env.mongoUri) {
    console.log("[database] MONGO_URI is empty; using in-memory demo data.");
    return false;
  }
  await mongoose.connect(env.mongoUri);
  console.log("[database] Connected to MongoDB.");
  return true;
}
