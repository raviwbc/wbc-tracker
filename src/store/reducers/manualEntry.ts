import { createSlice } from "@reduxjs/toolkit";

const manualEntry = createSlice({
    name : 'manualEntry',
    initialState : {
        Loading : false,
        data : {},
        message : ''
    },
    reducers : {
        ManualEntryRequest: (state)=>{
            state.Loading = true
        },
        enterySuccess: (state, action)=>{
            state.data = action.payload,
            state.Loading = false,
            state.message = ''
        },
        Entryfailure : (state, action)=>{
            state.Loading = false,
            state.data =[],
            state.message = action.payload
        }

    }
})

export const {ManualEntryRequest, enterySuccess, Entryfailure} = manualEntry.actions
export const manualEntryReducer = manualEntry.reducer