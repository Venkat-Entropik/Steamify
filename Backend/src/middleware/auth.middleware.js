import User from "../models/Users.js";
import jwt from "jsonwebtoken";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unuthorized - No token Provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded)
      return res.status(401).json({ message: "Unuthorized - Invalid Token" });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user)
      return res.status(401).json({ message: "Unuthorized - User not found" });

    req.user = user;

    next();
  } catch (error) {
    console.error("Protected Route error:", error)
    res.status(500).json({ message: "Internal Server Error" });
  }
};
