import { Server } from "socket.io"
import http from "http"
import express from "express"


const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true,
    },
})


//chat section 
export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

const userSocketMap={};   // {userid:socketid}

io.on("connection", (socket) => {
    console.log("a user is connected ", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId]=socket.id


    //io.emit() is used to send evvent to all the connected client
io.emit("getOnlineUsers",Object.keys(userSocketMap));


    socket.on("disconnect", () => {
        console.log("a user is disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

export { io, app, server }