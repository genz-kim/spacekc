import express from "express";
import 'dotenv/config'; // ✅ This will load environment variables automatically
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import prisma from "./lib/prisma.js"; // Ensure Prisma is initialized

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Matches your frontend
    credentials: true, // Enables cookies/auth
  })
);
app.use(express.json());
app.use(cookieParser());

// Clerk Authentication Middleware
app.use(
  ClerkExpressWithAuth({
    apiKey: process.env.CLERK_SECRET_KEY, // Make sure this matches the updated key in .env
  })
);


// API Routes
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Serve static files (React frontend)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Database Connection Check & Server Start
const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
