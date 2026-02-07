import http from "http";
import app from "./app";
import dotenv from "dotenv";
import { prisma } from "../config/db";

dotenv.config();

const PORT = Number(process.env.PORT || 5000);

async function start() {
  try {
    await prisma.$connect();
    console.log("✅ DB connected");

    http.createServer(app).listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
  }
}

start();
