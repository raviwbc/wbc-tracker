import { createSlice } from "@reduxjs/toolkit";

const trackerAPICalls = createSlice({
    name : 'timetracker',
    initialState : {
        Loading : false,
        data : [],
        message : ''
    },
    reducers : {
        ProjectListRequest:(state)=>{
            state.Loading = true
        },
        projectListSuccess:(state, action:any)=>{
            state.Loading = false
            state.data =action.payload
        },
        projectListFailed:(state, action:any)=>{
            state.Loading = false
            state.data =[]
            state.message = action
        }
    }
})

export const trackerReducer = trackerAPICalls.reducer
export const {ProjectListRequest, projectListSuccess, projectListFailed} = trackerAPICalls.actions