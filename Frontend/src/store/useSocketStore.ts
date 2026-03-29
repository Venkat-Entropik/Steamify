import { create } from "zustand";
import { io } from "socket.io-client";
import type { socketStore } from "../types/streamify.types";

const BASE_URL =
 import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5001";

export const useSocketStore = create<socketStore>((set, get) => ({
  socket: null,
  onlineUsers: [],
  messages: [],
  connectSocket: () => {
    const existingSocket = get().socket;
    if (existingSocket?.connected) return;
    if (existingSocket) {
      existingSocket.off("getOnlineUsers");
      existingSocket.disconnect();
    }

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
    const socket = get().socket;
    if (!socket) return;
    socket.off("getOnlineUsers");
    socket.disconnect();
    set({ socket: null, onlineUsers: [] });
  },

  subscribeToMessage: () => {
    const socket = get()?.socket;
    if (!socket) return;

    socket?.on("newMessage", (newMessage) => {
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });
    });
  },

  unSubscribeFromMessages: () => {
    const socket = get().socket;
    if(!socket) return;
    socket.off("newMessage")
  }
}));
