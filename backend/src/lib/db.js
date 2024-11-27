import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connecting to : ${conn.connection.host}`);
    }catch(e){
        console.log(e.message);
    }
}