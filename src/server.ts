import app from "./app";
import dotenv from "dotenv";
import { prisma } from "../config/db";

dotenv.config();

let isConnected = false;

async function connectToDB() {
  if (isConnected) return;
  await prisma.$connect();
  console.log("✅ DB connected");
  isConnected = true;
}

export default async function handler(req: any, res: any) {
  try {
    await connectToDB();
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
