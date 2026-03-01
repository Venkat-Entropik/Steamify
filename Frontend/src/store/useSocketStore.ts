import { create } from "zustand";
import { io, Socket } from "socket.io-client";

const BASE_URL =
 import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5001";

 interface Message {
  senderId: string;
  receiverId: string;
  text: string;
}

interface socketStore {
  socket: Socket | null;
  onlineUsers: string[];
  messages: Message[];
  connectSocket: () => void;
  disconnectSocket: () => void;
  subscribeToMessage: () => void;
  unSubscribeFromMessages: () => void;
}

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
