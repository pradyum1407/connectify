import axios from "axios"

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:500/api" : "/api";

export const axiosInstance = axios.create({
baseURL:BASE_URL,
withCredentials:true  //send cookie with the request    

})