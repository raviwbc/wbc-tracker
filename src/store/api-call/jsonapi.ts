import axios from "axios";
import { APP_CONSTANTS } from "../constants.ts";
import axiosInstance from "../config/axiosInstance.ts";

export function fetchPostsAPI() {
    return axios.get("https://jsonplaceholder.typicode.com/posts");
}


export function getProjectList(){
  return axiosInstance.get(`${APP_CONSTANTS.API.GETPROJECTLIST}`)
  return axios.get(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.GETPROJECTLIST}`)
}
