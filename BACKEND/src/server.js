import express from "express";
import dotenv from "dotenv"
import authRoutes from "./Routes/auth.route.js"
import usersRoutes from "./Routes/user.route.js"
import chatRoutes from "./Routes/chat.route.js"
import { connectDb } from "./Lib/db.js";
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
const PORT =  process.env.PORT;


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/chat",chatRoutes)

app.listen(PORT,()=>{
console.log(`server is running  on port ${PORT}`);
connectDb();
})