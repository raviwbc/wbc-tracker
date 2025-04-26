import { createSlice } from "@reduxjs/toolkit";


const projectListSegraction =  (tasks :any[]):any=>{
    debugger
    
    let projectList : any[] =[]
    let set = new Set()
    tasks.forEach(resp=>{
        
        
        if(!set.has(resp.projectID)){
            set.add(resp.projectID)
            projectList.push(resp)
        }
        
    })
    return projectList
}

const trackerAPICalls = createSlice({
    name : 'timetracker',
    initialState : {
        Loading : false,
        data : {},
        message : ''
    },
    reducers : {
        ProjectListRequest:(state)=>{
            state.Loading = true
        },
        projectListSuccess:(state, action:any)=>{
            state.Loading = false
            const projectList = projectListSegraction(action.payload.model);
            state.data = { taskList: action.payload.model, projectList: projectList}
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