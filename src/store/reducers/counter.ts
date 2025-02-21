import { createSlice } from "@reduxjs/toolkit";



const counter = createSlice({
    name: "counter",
    initialState: { count: 1 },
    reducers : {
        increment : (state:any)=>{
            console.log(state)
            console.log(state.count)
            debugger
            state.count += 1
        },
        decrement : (state :{count:number})=>{
            state.count -= 1
        },
        incrementAsync : ()=>{}
    }
})

export const counterReducer = counter.reducer
export const  { increment, decrement, incrementAsync } = counter.actions