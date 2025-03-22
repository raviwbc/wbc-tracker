import axios from "axios";
import { APP_CONSTANTS } from "../constants.ts";
import axiosInstance from "../config/axiosInstance.ts";
import { manualEntryData } from "../../model/timetracker.ts";

export function fetchPostsAPI() {
    return axios.get("https://jsonplaceholder.typicode.com/posts");
}


export function getProjectList(){
  return axiosInstance.get(`${APP_CONSTANTS.API.GETPROJECTLIST}`)
}


export function postManualEntry(payload:manualEntryData){
  return axiosInstance.post(`${APP_CONSTANTS.API.POSTMANUALENTRY}`, payload)
}
