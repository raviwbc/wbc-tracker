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






const autoEntry = createSlice({
    name : 'autoentry',
    initialState : {
        Loading : false,
        data : {},
        message : ''
    },
    reducers : {
        AutoEntryRequest: (state, action)=>{
                      
            state.Loading = true
        },
        AutoEntrySuccess: (state, action)=>{
            state.data = action.payload.data
            state.Loading = false
            state.message = ''
        },
        AutoEntryfailure : (state, action)=>{
            state.Loading = false
            state.data =[]
            state.message = action.payload
        }
    }
})


export const {AutoEntryRequest, AutoEntrySuccess, AutoEntryfailure} = autoEntry.actions;
export const autoEntryReducer = autoEntry.reducer;




const autoEntryStop = createSlice({
    name : 'autoEntryStop',
    initialState : {
        Loading : false,
        data : {},
        message : ''
    },
    reducers : {
        AutoEntryStopRequest: (state, action)=>{       
            state.Loading = true
        },
        AutoEntryStopSuccess: (state, action)=>{
            state.data = action.payload
            state.Loading = false
            state.message = ''
        },
        AutoEntryStopfailure : (state, action)=>{
            state.Loading = false
            state.data =[]
            state.message = action.payload
        }
    }
})


export const {AutoEntryStopRequest, AutoEntryStopSuccess, AutoEntryStopfailure} = autoEntryStop.actions;
export const autoEntryStopReducer = autoEntryStop.reducer;