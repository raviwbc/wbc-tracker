import axios from 'axios';
import { APP_CONSTANTS } from '../constants.ts';
// import { config } from './apiPostConfig';

const axiosInstance = axios.create({
    baseURL : APP_CONSTANTS.SERVICE_BASE_URL,
})

axiosInstance.interceptors.request.use(
    (config:any)=>{
        let token = localStorage.getItem('accessToken'); // Get token from localStorage or any other storage        
        if (config.url !== '/Auth/Login' && token) { 
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          }
        }
          return config;
    },
    (error) => {
        return Promise.reject(error);
      }
)
export default axiosInstance;
