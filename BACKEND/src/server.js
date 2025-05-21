import express from "express";
import dotenv from "dotenv"
import authRoutes from "./Routes/auth.route.js"
import { connectDb } from "./Lib/db.js";

dotenv.config();
const app=express();
const PORT =  process.env.PORT;


app.use(express.json());
app.use("/api/auth", authRoutes)

app.listen(PORT,()=>{
console.log(`server is running  on port ${PORT}`);
connectDb();
})