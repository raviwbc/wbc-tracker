import { createSlice } from "@reduxjs/toolkit"

const entryList = createSlice({
    name : 'EntryList',
    initialState : {
        Loading : false,
        data : {},
        message : ''
    },
    reducers : {
        completedEntryRequest: (state,action)=>{
            return {
                ...state, Loading : true
            }             
        },
        completedEntrySuccess: (state, action)=>{   
            state.data = action.payload
            state.Loading = false
            state.message = ''
        },
        completedEntryFailure : (state, action)=>{
            state.Loading = false
            state.data =[]
            state.message = action.payload
        }
    }
})


const deleteTask = createSlice({
    name : 'deleteTask',
    initialState : {
        Loading : false,
        data : {},
        message : ''
    },
    reducers : {
        deleteRequest : (state,action)=>{
            return {
                ...state, Loading : true
            }  
        },
        deleteSuccess:(state, action)=>{
            state.data = action.payload
            state.Loading = false
            state.message = ''
        },
        deleteFailer : (state, action)=>{
            state.Loading = false
            state.data =[]
            state.message = action.payload
        }
    }
})

export const { completedEntryFailure, completedEntryRequest, completedEntrySuccess } = entryList.actions
export const entryListReducer = entryList.reducer


export const { deleteRequest,deleteSuccess,deleteFailer  } = deleteTask.actions
export const deleteTaskReducer = deleteTask.reducer