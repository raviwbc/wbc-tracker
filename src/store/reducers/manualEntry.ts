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
            let resp = action.payload
            state.data = resp
            state.Loading = false
            state.message = resp.status
        },
        Entryfailure : (state, action)=>{
            state.Loading = false
            state.data = action.payload;
            state.message = action.payload.message
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
            state.message = ''
            state.data  = {}
        },
        AutoEntrySuccess: (state, action)=>{
            state.data = action.payload.data
            state.Loading = false
            state.message = 'success'
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
            state.data = action.payload.data
            state.Loading = false
            state.message = 'success'
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





const getStart = createSlice({
    name : 'getStarts',
    initialState : {
        Loading : false,
        data : {},
        message : ''
    },
    reducers : {
        getStartRequest: (state)=>{       
            state.Loading = true
        },
        getStartSuccess: (state, action)=>{
            console.log(action)
            state.data = action.payload.data.model
            state.Loading = false
            state.message = 'success'
        },
        getStartFailure : (state, action)=>{
            state.Loading = false
            state.data =[]
            state.message = action.payload
        }
    }
})


export const {getStartRequest, getStartSuccess, getStartFailure} = getStart.actions;
export const getStartReducer = getStart.reducer;