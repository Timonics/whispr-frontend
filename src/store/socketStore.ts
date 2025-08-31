import { io, type Socket } from "socket.io-client";
import { create } from "zustand";

export interface Message {
  _id: string;
  conversationId: string;
  text: string;
  image?: string;
  senderId: string | User;
  receiverId: string | User;
  timestamp?: string;
}

export interface Conversation {
  _id: string;
  participants: User[];
  last_message: Message | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface SocketState {
  socket: Socket | null;
  onlineUsers: User[];
  conversations: Conversation[];
  messages: Record<string, Message[]>; // 🔹 per-conversation messages

  connectSocket: (userId: string) => void;
  fetchConversations: (userId: string) => void;
  fetchMessages: (
    senderId: string,
    receiverId: string,
    conversationId: string,
  ) => void;
  sendMessage: (message: {
    text: string;
    receiverId: string;
    senderId: string;
    image?: string;
  }) => void;
  disconnectSocket: () => void;
}

const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  onlineUsers: [],
  conversations: [],
  messages: {},

  connectSocket: (userId: string) => {
    if (get().socket) return;

    const socket = io("http://localhost:5002", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to socket server with ID:", socket.id);
      socket.emit("userConnected", userId);
    });

    socket.on("updatedOnlineUsers", (users: User[]) => {
      set({ onlineUsers: users });
    });

    socket.on("conversationsFetched", (conversations: Conversation[]) => {
      set({ conversations });
    });

    socket.on("messagesFetched", (messages: Message[]) => {
      if (messages.length === 0) return;
      const convId = messages[0].conversationId;
      set((state) => ({
        messages: { ...state.messages, [convId]: messages },
      }));
    });

    socket.on("receiveMessage", (message: Message) => {
      const convId = message.conversationId;

      // 1. Append message to the right conversation
      set((state) => ({
        messages: {
          ...state.messages,
          [convId]: [...(state.messages[convId] || []), message],
        },
      }));

      // 2. Update conversation last_message
      set((state) => {
        const updatedConversations = state.conversations.map((c) =>
          c._id === convId
            ? {
                ...c,
                last_message: message,
                updated_at: new Date().toISOString(),
              }
            : c
        );
        return { conversations: updatedConversations };
      });
    });

    set({ socket });
  },

  fetchConversations: (userId: string) => {
    const socket = get().socket;
    if (!socket) return;
    socket.emit("fetchConversations", userId);
  },

  fetchMessages: (
    senderId: string,
    receiverId: string,
    conversationId: string,
  ) => {
    if(!conversationId) return;
    const socket = get().socket;
    if (!socket) return;
    socket.emit("fetchMessages", { senderId, receiverId });
  },

  sendMessage: (message) => {
    const socket = get().socket;
    if (!socket) return;
    socket.emit("sendMessage", message);
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, onlineUsers: [], conversations: [], messages: {} });
    }
  },
}));

export default useSocketStore;
