
import { io } from "socket.io-client";

let socket = null;

const connectSocket = (authUser) => {
  const Base_Url = "http://localhost:5000";

  if (!authUser || socket?.connected) return;

  socket = io(Base_Url, {
    query: { userId: authUser._id },
  });

  socket.on("connect", () => {
    console.log("Connected with socket id:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
  });

  socket.connect();
};

export default connectSocket;




export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}