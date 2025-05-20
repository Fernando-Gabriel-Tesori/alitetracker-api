import mongoose from "mongoose";

export async function setupMongo(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    console.log("🎲 connecting to database...");
    await mongoose.connect("mongodb://localhost:27017/elitetracker");
  } catch {
    console.error("❌ Database not connected.");
  }
}
