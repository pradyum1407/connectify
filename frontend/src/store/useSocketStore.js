import { io } from "socket.io-client";
import { create } from "zustand"

export const useSocketStore = create((set, get) =>({
    socket: null,
    onlineUsers:[],

    connectSocket: (userId) => {
        const base_url = "http://localhost:5000"
        const currentSocket = get().socket;

        if (currentSocket?.connected) return

        const newSocket = io(base_url,{
            query:{userId}
        });

        newSocket.connect();

        set({socket:newSocket});

        newSocket.on("getOnlineUsers", (usersIds) => {
           set({onlineUsers:usersIds})
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