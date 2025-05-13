import express from "express";
import { Server } from "socket.io";
import http from "http";

// Create an Express app
const app = express();

// Create a basic HTTP server
const server = http.createServer(app);

// Allow connections from localhost during development and from the production URL
const allowedOrigins = [
  "http://localhost:5173",           // Local development URL
  "https://spacekc.onrender.com",    // Deployed frontend URL on Render
];

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        // Allow requests from the allowed origins
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS policy"));
      }
    },
    methods: ["GET", "POST"],
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

// Listen for Socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(`User ${userId} connected`);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);

    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
    } else {
      console.log(`User ${receiverId} is not online.`);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("A user disconnected");
  });
});

// Start the HTTP server to listen on port 4000
server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
