import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";


export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,



  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log(
        "Messages fetching Error:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      console.log(res.data);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log("Error in sending message:", error.message);
      toast.error(error.response?.data?.message);
    }
  },

  subscribeToMessage:  () => {
    const {selectedUser} = get();
    if(!selectedUser) return;

    const socket = useAuthStore.getState().socket;


    socket.on('new message', (newMessage)=>{
      const isMessageSentfromSelectedUser = newMessage.senderId === selectedUser._id;
      if(!isMessageSentfromSelectedUser) return;
      set({
        messages: [...get().messages, newMessage],
      })
    })
  },

  unSubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('new message');
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
