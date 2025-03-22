import { createSlice } from "@reduxjs/toolkit";
export const loginValidation = createSlice({
    name : 'auth',
    initialState : {
        Loading : false,
        data : {},
        message : ''
    },
    reducers : {
        loginRequest:(state)=>{
            state.Loading = true
        },
        loginSuccess:(state, action:any)=>{
            state.Loading = false
            console.log("Auth",action.payload.model);
            state.data = { auth: action.payload.model.tasks}
        },
        loginFailed:(state, action:any)=>{
            state.Loading = false
            state.data =[]
            state.message = action
        }
    }
})

export const trackerReducer = loginValidation.reducer
export const {loginRequest, loginSuccess, loginFailed} = loginValidation.actions

