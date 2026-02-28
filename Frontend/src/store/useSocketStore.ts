import { create } from "zustand";
import { io, Socket } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

interface socketStore {
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<socketStore>((set, get) => ({
  socket: null,
  onlineUsers: [],
  connectSocket: () => {
    if (get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket?.disconnect();
      set({ socket: null });
    }
  },
}));
