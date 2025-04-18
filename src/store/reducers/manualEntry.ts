import { createSlice } from "@reduxjs/toolkit";

const manual = createSlice({
    name : 'manualEntry',
    initialState : {
        Loading : false,
        data : {},
        message : ''
    },
    reducers : {
        ManualEntryRequest: (state, action)=>{
            console.log(action)            
            state.Loading = true
        },
        enterySuccess: (state, action)=>{
            state.data = action.payload
            state.Loading = false
            state.message = ''
        },
        Entryfailure : (state, action)=>{
            state.Loading = false
            state.data =[]
            state.message = action.payload
        }
    }
})


export const {ManualEntryRequest, enterySuccess, Entryfailure} = manual.actions;
export const manualEntryReducer = manual.reducer;