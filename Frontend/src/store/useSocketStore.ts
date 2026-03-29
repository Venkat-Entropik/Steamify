import { create } from "zustand";
import { io } from "socket.io-client";
import type { socketStore } from "../types/streamify.types";
import { apiInstance } from "../interceptor";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5001";

export const useSocketStore = create<socketStore>((set, get) => ({
  socket: null,
  onlineUsers: [],
  messages: [],
  isMessagesLoading: false,
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
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
    if (!socket) return;
    socket.off("newMessage");
  },

  getMessagesByUserId: async (userId) => {
    if (!userId) return;
    set({ isMessagesLoading: true });
    try {
      const response = await apiInstance.get(`/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  getSelectedUser: async (userId: string) => {
    try {
      const response = await apiInstance.get(`/users/user/${userId}`);
      set({ selectedUser: response.data });
    } catch (error) {
      console.error(error);
      set({ selectedUser: null });
    }
  },

  sendMessage: async (receiverId, messageData) => {
    const messages = get().messages;
    if (!receiverId) return;
    try {
      const res = await apiInstance.post(`/messages/send/${receiverId}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error(error);
    }
  },
}));
