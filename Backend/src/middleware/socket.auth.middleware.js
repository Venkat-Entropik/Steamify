import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const socketAuthMiddleWare = async (socket, next) => {
  try {
    // extract token from http only cookie
    const token = socket?.handshake?.headers?.cookie
      ?.split("; ")
      ?.find((row) => row?.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: no token provided");
      return next(new Error("Unauthorized - no token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      console.log("Socket Connection Rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid token"));
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return next(new Error("User not found"));

    socket.user = user;
    socket.userId = user._id.toString();
    next();
  } catch (error) {
    next(new Error("Unauthorized authentication error"));
  }
};
