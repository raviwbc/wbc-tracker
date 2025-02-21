import axios from "axios";

export function fetchPostsAPI() {
    return axios.get("https://jsonplaceholder.typicode.com/posts");
  }