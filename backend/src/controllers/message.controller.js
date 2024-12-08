import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from '../lib/socket.js';

export const getUsersForSidebar = async (req, res) => { //get all users for sidebar except me
    try{
        const loggedInUserId = req.user._id;
        const filterdUser = await User.find({_id: {$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filterdUser);
    }catch(error){
        console.log("error in getUsersForSidebar ", error.message);
        res.status(500).json({error: "internal server error"});
    }
}

export const getMessages = async (req, res) => { //get all the chats between two users
    try{
        const {id: userToChatId} = req.params
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId , receiverId: myId}
            ]
        })
        res.status(200).json(messages);
    }catch(error){
        console.log("error in getMessages ", error.message);
        res.status(500).json({error: "internal server error"});
    }
}

export const sendMessage = async (req, res) => {  //send a message to a user
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params; //the other member
        const senderId = req.user._id; //me

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });


        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("new message", newMessage);
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error in sendMessage ", error.message);
        res.status(500).json({ error: "internal server error" });
    }
}