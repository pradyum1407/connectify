import { io } from "socket.io-client";
import { create } from "zustand"

export const useSocketStore = create((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: (userId) => {
    const base_url = "https://connectify-qnug.onrender.com"
    const currentSocket = get().socket;

    if (currentSocket?.connected) return

    const newSocket = io(base_url, {
      query: { userId },
      transports: ["websocket", "polling"],
    });

    newSocket.connect();

    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (usersIds) => {
      set({ onlineUsers: usersIds })

    })
  },
  disconnectSocket: () => {
    const currentSocket = get().socket;
    if (currentSocket?.connected) {
      currentSocket.disconnect();
      set({ socket: null });
    }
  },


}))