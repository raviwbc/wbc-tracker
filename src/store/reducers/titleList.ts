import { createSlice } from "@reduxjs/toolkit";

const titleList = createSlice({
    name : 'titleList',
    initialState : { loading: true,
        message: "",
        error: "",
    data :[]},
    reducers : {
        fetchPostsRequest: (state)=>{
            state.loading = true
        },
        apiSuccess : (state, action: any)=>{
            state.loading = false
            state.error = ""
            state.data = action
        },
        apifailed : (state, action: any)=>{
            state.loading = false
            state.error = ""
            state.data = action
        }
    }
})
export const postListReducer = titleList.reducer
export const {apiSuccess, apifailed, fetchPostsRequest} = titleList.actions