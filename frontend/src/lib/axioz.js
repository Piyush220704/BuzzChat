import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api", //here we conncect the frontend to backend using this baseUrl
    withCredentials: true, //to send cookies with requests
})