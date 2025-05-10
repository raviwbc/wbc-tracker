import axios from 'axios';
import { APP_CONSTANTS } from '../constants.ts';
// import { config } from './apiPostConfig';

const axiosInstance = axios.create({
    baseURL : APP_CONSTANTS.SERVICE_BASE_URL,
})

axiosInstance.interceptors.request.use(
    (config:any)=>{
        let token = localStorage.getItem('accessToken'); // Get token from localStorage or any other storage
        
        if (config.url !== '/Auth/Login') { 
        // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXAiOiJwYXJ0aGliYW4iLCJzdWIiOiI5MyIsIm5hbWUiOiJwYXJ0aGliYW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJwYXJ0aGliYW4iLCJqdGkiOiI2NjAxM2Q4NC04ODI2LTRmMzQtYjY5OS1iM2Y3ZjNjZmVkNmIiLCJpYXQiOjE3NDI2MjM1MzYsIlVzZXIiOiI5MyIsIm5iZiI6MTc0MjYyMzUzNSwiZXhwIjoxNzQyNjQ1MTM1LCJpc3MiOiJBUElUb2tlblNlcnZlciIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.nJn0B2JoFU2hqpPCZmYQ3UnppIGbdUWSNqbE1LJ95JA"
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
          return config;
    },
    (error) => {
        return Promise.reject(error);
      }
)
export default axiosInstance;
