import axios from "axios";
import { APP_CONSTANTS } from "../constants.ts";
import axiosInstance from "../config/axiosInstance.ts";


export async function fetchPostsAPI() {
    return await axios.get("https://jsonplaceholder.typicode.com/posts");
}


export async function getProjectList() {
    return await axiosInstance.get(`${APP_CONSTANTS.API.GETPROJECTLIST}`);
}


export async function postManualEntry(data: any) {
    return await axiosInstance.post(`${APP_CONSTANTS.API.POSTMANUALENTRY}`, data);
}


export async function login(formData: { username: string; password: string }) {
    return await axiosInstance.post(`${APP_CONSTANTS.API.LOGIN}`, formData);
}
