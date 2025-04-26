import axios from "axios";
import { APP_CONSTANTS } from "../constants.ts";
import axiosInstance from "../config/axiosInstance.ts";
import { manualEntryData } from "../../model/timetracker.ts";


export async function fetchPostsAPI() {
    return await axios.get("https://jsonplaceholder.typicode.com/posts");
}


export async function getProjectList() {
    return await axiosInstance.get(`${APP_CONSTANTS.API.GETPROJECTLIST}93`);
}

export async function login(formData: { username: string; password: string }) {
    return await axiosInstance.post(`${APP_CONSTANTS.API.LOGIN}`, formData);
}
export function postManualEntry(payload:manualEntryData){
  return axiosInstance.post(`${APP_CONSTANTS.API.POSTMANUALENTRY}`, payload)
}

export function completedEntryList(payload:string){
  return axiosInstance.get(`${APP_CONSTANTS.API.ENTRYLIST}${payload}`,)

}