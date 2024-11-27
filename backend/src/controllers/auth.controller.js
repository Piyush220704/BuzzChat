import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/util.js";
import User  from '../models/user.model.js'
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "all fields required" });
    }

    if (password.length < 6) {
      return res.statue(400).json({ massage: "password is too short" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ massage: "email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //generate a jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  const {email, password} = req.body;
  try{
    const user = await User.findOne({ email: email });
    if(!user){
      return res.status(400).json({message: "Invalid credentials"})
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
      return res.status(400).json({message: "invalid password"});
    }
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic
    })
    }catch(error){
      console.log("error in login controller", error.message);
      res.status(500).json({message: "internal server error"});
  }
};

export const logout = (req, res) => {
  try{
    res.cookie('token', "", {maxAge:0});
    res.status(200).json({message: "Logged out successfully"});
  }catch(error){
    console.log("error in logout controller", error.message);
    res.status(500).json({message: "internal server error"});
  }
};


export const updateProfile = async ()=>{  
  try{
    const {profilePic} = req.body;
    const userID = req.user.user_id;
    if(!profilePic) {
      return res.status(400).json({message: "profile pic is required"});
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userID, {profilePic: uploadResponse.secure_url}, {new: true});

    res.statue(200).json(updatedUser)
  }catch(error){
    console.log("error in updateProfile", error);
    res.status(500).json({message: "internal server error"});

  }
}

export const checkAuth = (req,res)=>{ //for everytime we refresh our page we just check if user is authenticated ie jwt is present or not
  try{
    res.status(200).json(req.user);
  }catch(error){
    console.log(("error in checkAuth controller", error.message));
    res.status(500).join({message: "internal server error"});
  }
}