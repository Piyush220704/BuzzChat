import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: true,

    checkAuth: async()=>{
        try{
            const res = await axiosInstance.get("/auth/check");
            console.log("Check Auth Response:", res.data);
            set({authUser: res.data})
        }catch(err){
            console.log("Check Auth Error:", err);
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async (data)=>{
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            console.log("Signup Response:", res.data);
            set({authUser: res.data});
            toast.success("account created successfully");
            
        } catch (error) {
            console.log("Signup Error:", error.response?.data?.message || error.message)
            toast.error(error.response?.data?.message || "Something went wrong");
        }finally{
            set({isSigningUp: false});
        }
    },

    login : async (data)=>{
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({authUser: res.data});
            toast.success("Logged in successfully");
        } catch (error) {
            console.log("Login Error:", error.response?.data?.message || error.message)
            toast.error(error.response?.data?.message || "Something went wrong");
        }finally{
            set({isLoggingIn: false});
        }

    },

    logout: async ()=>{
        try {
            await axiosInstance.post("auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
        } catch (error) {
            console.log("Logout Error:", error.response?.data?.message || error.message)
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    updateProfile: async (data)=>{
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put('auth/update-profile', data);
            set({authUser: res.data})
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Update Profile Error:", error.response?.data?.message || error.message)
            toast.error(error.response?.data?.message || "Something went wrong");
        }finally{
            set({isUpdatingProfile: false});
        }
    },



}));