import React, { useEffect, useState } from 'react'
import './autotask.css'
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import moment from 'moment'
import * as Yup from 'yup';
import { autoUpdate, projectListmodel, stopTimeSheet, tasklist } from '../../model/timetracker.ts';
import { useDispatch } from 'react-redux';
import { AutoEntryRequest } from '../../store/reducers/manualEntry.ts';
import { RunningTimer } from '../timer/timer.tsx';


let errorDefaultVlaue = {
    project: null,
    task: null,
}
interface errortrackerForm  {
    project: number | null,
    task: number | null,
}
interface stopErrortrackerForm  {
    comments: string | null,
}

let defaultValue = {
    project: null,
    task: null,
    comments:null,
}

interface trackerForm {
    project: number | null,
    task: number | null,
    comments: string | null
}

type AutoTaskProps  = {
    projectList: any
    submitFunc :(postData: autoUpdate) => void;
    taskStared : boolean;
    runningTaskDetails : any;
}

// export function Autotask({ projectList, submitFunc }) {
export const Autotask: React.FC<AutoTaskProps> = ({ projectList, submitFunc, taskStared, runningTaskDetails }) => {


    const [formErrors, UpdateErrors] = useState<errortrackerForm>(errorDefaultVlaue)
    const [stopForm, stopFormUpdateErrors] = useState<stopErrortrackerForm>({comments : null})
    const [trackerForm, UpdateTrackerForm] = useState<trackerForm>(defaultValue)
    const [taskList, setTaskList] = useState<projectListmodel[]>([])
    const [prjList, setPrjList] = useState<tasklist[]>()
    const [totaltaskList, setTotalTaskList] = useState<projectListmodel[]>([])
    const [formUpdated, setformUpdated] = useState<boolean>(false)
    // const [taskStared, setTaskStared] = useState<boolean>(false)
    const dispatch = useDispatch()
    console.log(runningTaskDetails)
    useEffect(() => {
        setPrjList(projectList.data.projectList)
        setTotalTaskList(projectList.data.taskList)
    }, [projectList])




    async function submitcall(event: any) {
        
        event.preventDefault()
        debugger
        setformUpdated(true)
        let result;
        try {
            if(!taskStared){
                result = await ValidateRecord.validate(trackerForm, { abortEarly: false })
                UpdateErrors(errorDefaultVlaue)
            }else{
                result = await ValidateStopRecord.validate(trackerForm, { abortEarly: false })
                stopFormUpdateErrors({comments:null})
            }
                console.log(trackerForm)
                let currentTime =  moment().format().toString()
                if(taskStared){
                    let postData = new stopTimeSheet()
                    postData.comment =""
                    postData.startTime = ""
                    postData.taskID = trackerForm.task ? trackerForm.task : 0;
                    postData.projectID = trackerForm.project? trackerForm.project :0
                    console.log(postData)

                }else{
                let postData = new autoUpdate()
                postData.projectID = trackerForm.project? trackerForm.project :0;
                postData.taskID = trackerForm.task ? trackerForm.task : 0;
                postData.startTime = currentTime;
                postData.timeAdded= currentTime;
                postData.timeSheetDate= currentTime;
                console.log(postData)
                submitFunc(postData)
            }
                // dispatch(AutoEntryRequest(postData))
            
        } catch (err: any) {
            if(!taskStared){
                           UpdateErrors(errorDefaultVlaue);
            err.inner.forEach((res: any) => {
                UpdateErrors(prev => {
                    return { ...prev, [res.path]: [res.errors[0]] }
                })
            })
            }else{

            stopFormUpdateErrors({comments:null})
            if(formUpdated == true){
                          err.inner.forEach((res: any) => {
                            console.log([res.path], [res.errors[0]])
                    stopFormUpdateErrors(prev => {
                        return { ...prev, [res.path]: [res.errors[0]] }
                    })
                })
            }}
        }
    }
    let formChange = (data: any) => {
        debugger
        const { name, value } = data.target;
        UpdateTrackerForm(prev => {
            return { ...prev, [name]: value, }
        })
        if (value && name == 'project') {
            let task = totaltaskList?.filter(resp => resp.projectID == value)
            setTaskList(task ? task : [])
        }
    }
    let formBlur = async (data: any) => {
        let result: any
        if(!taskStared){
            try {
            result = await ValidateRecord.validate(trackerForm, { abortEarly: false })
            UpdateErrors(errorDefaultVlaue);
            }catch (err: any) {
            UpdateErrors(errorDefaultVlaue);
            if (formUpdated == true) {
                err.inner.forEach((res: any) => {
                    UpdateErrors(prev => {
                        return { ...prev, [res.path]: [res.errors[0]] }
                    })
                })
            }
        }
        }else{
            try{
            result = await ValidateStopRecord.validate(trackerForm, { abortEarly: false })
            stopFormUpdateErrors({comments:null})
            }catch(err: any){
              stopFormUpdateErrors({comments:null})
            if(formUpdated == true){
                          err.inner.forEach((res: any) => {
                    stopFormUpdateErrors(prev => {
                        return { ...prev, [res.path]: [res.errors[0]] }
                    })
                })
            }
        }
        }
    }
    let ValidateRecord = Yup.object({
        project: Yup.number().required("Field is Required"),
        task: Yup.number().required("Field is Required"),
    })
        let ValidateStopRecord = Yup.object({        
        comments: Yup.string().required("Field is Required"),
    })

    return <>
        <div className="main">
            <form onSubmit={submitcall} className="formArea">
                {!taskStared ?
                <div>
                <div>
                    <RunningTimer startTime={'2025-05-10T11:14:24+05:30'}/>
                    <FormControl fullWidth error={formErrors.project ? true : false} >
                        <InputLabel id="Project">Project</InputLabel>
                        <Select

                            labelId="Project"
                            value={trackerForm.project}
                            label="Project"
                            name='project'
                            onChange={formChange}
                            onBlur={formBlur}
                        >
                            {prjList && prjList.map((data) => (
                                <MenuItem key={data.projectID} value={data.projectID}>
                                    {data.projectName}
                                </MenuItem>
                            ))}
                        </Select>
                        {/* {formErrors.project && <FormHelperText>{formErrors.project[0]}</FormHelperText>} */}
                    </FormControl>
                </div>
                <div>
                    <FormControl fullWidth error={formErrors.task ? true : false} >
                        <InputLabel id="task">Task</InputLabel>
                        <Select
                            labelId="task"
                            value={trackerForm.task}
                            label="task"
                            name='task'
                            onChange={formChange}
                            onBlur={formBlur}
                        >
                            {taskList && taskList.map((data: projectListmodel) => (
                                <MenuItem key={data.taskID} value={data.taskID}>
                                    {data.title}
                                </MenuItem>
                            ))}
                        </Select>
                        {/* {formErrors.project && <FormHelperText>{formErrors.project[0]}</FormHelperText>} */}
                    </FormControl>
                </div>
                </div>
                :
                <div>
                    selected project :
                    Selected Task :
                    timer : <RunningTimer startTime={'2025-05-10T11:14:24+05:30'}/>
                    <div>
                    {stopForm.comments}
                    <FormControl fullWidth error={stopForm.comments ? true : false} >
                        <TextField
                            label="comments"
                            value={trackerForm.comments}
                             variant="outlined"
                            name='comments'
                            onChange={formChange}
                            onBlur={formBlur}
                        />
                        {stopForm.comments && <FormHelperText>{stopForm.comments[0]}</FormHelperText>}
                    </FormControl>
                </div>
                </div>
                }
                <button type='submit'>
                    {!taskStared ?
                    <svg fill="#000000" width="20px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" version="1.1">
                        <g>
                            <path d="M4.993,2.496C4.516,2.223,4,2.45,4,3v26c0,0.55,0.516,0.777,0.993,0.504l22.826-13.008    c0.478-0.273,0.446-0.719-0.031-0.992L4.993,2.496z"/>
                            <path d="M4.585,30.62L4.585,30.62C3.681,30.62,3,29.923,3,29V3c0-0.923,0.681-1.62,1.585-1.62c0.309,0,0.621,0.085,0.904,0.248    l22.794,13.007c0.559,0.319,0.878,0.823,0.878,1.382c0,0.548-0.309,1.039-0.847,1.347L5.488,30.373    C5.206,30.534,4.894,30.62,4.585,30.62z M5,3.651v24.698l21.655-12.34L5,3.651z"/>
                        </g>
                    </svg>
                    :
                    <svg fill="#000000" width="18px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" version="1.1">
                        <g>
                            <path d="M28,27c0,0.55-0.45,1-1,1H5c-0.55,0-1-0.45-1-1V5c0-0.55,0.45-1,1-1h22c0.55,0,1,0.45,1,1V27z"/>
                            <path d="M27,29H5c-1.103,0-2-0.897-2-2V5c0-1.103,0.897-2,2-2h22c1.103,0,2,0.897,2,2v22C29,28.103,28.103,29,27,29z M27,27v1V27    L27,27L27,27z M5,5v22h21.997L27,5H5z"/>
                        </g>
                    </svg>
                    }
                </button>
            </form>
        </div>
    </>

}

