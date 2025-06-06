import express from "express";
import dotenv from "dotenv"
import authRoutes from "./Routes/auth.route.js"
import usersRoutes from "./Routes/user.route.js"
import chatRoutes from "./Routes/chat.route.js"
import { connectDb } from "./Lib/db.js";
import cookieParser from 'cookie-parser';
import cors from "cors"
import { app , server} from "./Lib/socket.js";
import path from "path"

dotenv.config();
const PORT =  process.env.PORT;

const __dirname = path.resolve();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true //allow frontend to send cookie
}))
app.use(express.json({limit: '10mb' }));
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/chat",chatRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT,()=>{
console.log(`server is running  on port ${PORT}`);
connectDb();
})