import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api", //here we conncect the frontend to backend using this baseUrl
    withCredentials: true, //to send cookies with requests
    headers: {
         'Content-Type': 'application/json'
    },
    maxContentLength: 50*1024*1024, //50mb
    maxBodyLength: 50*1024*1024, //50mb
    
});