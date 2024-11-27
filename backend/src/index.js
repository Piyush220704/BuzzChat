import express from "express";
const app = express();
import {connectDB} from "./lib/db.js";
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import messageRoutes from './routes/message.route.js'

app.use(cors({
    origin: "http://localhost:5713",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']  // allow all headers for cors request
}))
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);


app.listen(process.env.PORT, ()=>{
    connectDB();
    console.log('Server is running on port 5001');
})

