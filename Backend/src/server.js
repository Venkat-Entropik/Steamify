import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";


dotenv.config();

const app = express();

const __dirname = path.relative();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../Frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  })
}

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
  connectDB();
});
