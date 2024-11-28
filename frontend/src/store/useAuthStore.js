import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    
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
    }
}));