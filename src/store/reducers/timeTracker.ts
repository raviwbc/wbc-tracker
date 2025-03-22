import { createSlice } from "@reduxjs/toolkit";


const projectListSegraction =  (tasks :any[]):any=>{
    let projectList : any[] =[]
    let set = new Set()
    tasks.forEach(resp=>{
        debugger
        
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
            console.log('asassaas')
            state.Loading = true
        },
        projectListSuccess:(state, action:any)=>{
            state.Loading = false
            console.log("asdsad",action.payload.model);
            const projectList = projectListSegraction(action.payload.model.tasks);
            state.data = { taskList: action.payload.model.tasks, projectList: projectList}
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