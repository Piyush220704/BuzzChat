import express from "express";
import {connectDB} from "./lib/db.js";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import messageRoutes from './routes/message.route.js'
import {app, server, io} from './lib/socket.js';
import path from "path";


dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']  // allow all headers for cors request
}));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true, limit: '50mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({limit: '50mb'}));



app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    })
}


server.listen(PORT, ()=>{
    connectDB();
    console.log('Server is running on port 5001');
})

