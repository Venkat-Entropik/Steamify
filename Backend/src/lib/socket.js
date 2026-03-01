import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketAuthMiddleWare } from "../middleware/socket.auth.middleware.js";
const app = express();
const server = http.createServer(app);

const allowedOrigins = (process.env.CLIENT_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// apply authentication middle ware for all socket connection

io.use(socketAuthMiddleWare);

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() is used to send the events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket?.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
