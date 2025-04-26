import React, { useEffect, useState } from 'react'
import './autotask.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import moment from 'moment'
import * as Yup from 'yup';
import { projectListmodel, tasklist } from '../../model/timetracker.ts';


let errorDefaultVlaue = {
    project: null,   
    task: null,
  }
  let defaultValue = {
    project: null,  
    task: null,  
  }
  
interface trackerForm {
    project: number | null,
    task: number | null
  }


export function Autotask({projectList}){
    function submitcall(){

    }
    console.log(projectList)
    const [prjList, setPrjList] = useState<tasklist[]>()
    const [totaltaskList, setTotalTaskList] = useState<projectListmodel[]>([])
      useEffect(() => {
        setPrjList(projectList.data.projectList)
        setTotalTaskList(projectList.data.taskList)
      }, [])
    const [formUpdated, setformUpdated] = useState<boolean>(false)
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
    try {
      result = await ValidateRecord.validate(trackerForm, { abortEarly: false })
      UpdateErrors(errorDefaultVlaue)
    } catch (err: any) {
      UpdateErrors(errorDefaultVlaue);
      if(formUpdated == true){
      err.inner.forEach((res: any) => {
        UpdateErrors(prev => {
          console.log("Test", res.path)
          // console.log({ ...prev, [res.path]: [res.errors[0]] })
          return { ...prev, [res.path]: [res.errors[0]] }
        })
      })
    }
    }
    // }
  }
    let ValidateRecord = Yup.object({
      project: Yup.number().required("Field is Required"),
      task: Yup.number().required("Field is Required")
    })
    const [formErrors, UpdateErrors] = useState<trackerForm>(errorDefaultVlaue)
    const [trackerForm, UpdateTrackerForm] = useState<trackerForm>(defaultValue)
    const [taskList, setTaskList] = useState<projectListmodel[]>([])
    return <>
    <div className="main">
        <div>
        project 
        </div>
        <div>
            task
        </div>

        <div>
            Start
        </div>

        <form onSubmit={submitcall} className="formArea">
                  <div>
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
                  </form>


    </div>
    </>

}
Autotask.propTypes = { 
    projectList: projectListmodel
  }
