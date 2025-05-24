import React, { useEffect, useState } from "react";
import moment from "moment";
import * as Yup from 'yup';

import './timeTracker.css'
import {  FormControl,    InputLabel, MenuItem,  Select, Switch, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CompletedList } from "./completedTaskList/completedList.tsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ProjectListRequest } from "../store/reducers/timeTracker.ts";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AutoEntryRequest, AutoEntryStopRequest, getStartRequest, ManualEntryRequest } from "../store/reducers/manualEntry.ts";
import { completedEntryRequest } from "../store/reducers/todayCompletedList.ts";
import { getStartRes, ReducersList, tasklist } from "../model/timetracker.ts";
import { Autotask } from "./autoTask/autotask.tsx";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimerIcon from '@mui/icons-material/Timer';

type Dates = string[];


interface projectList {
  projectID: number;
  taskID: number;
  title: string;
  description: string
}

class manualEntryData {
    projectID: number = 0
    userID: number =0
    taskID: number=0
    startTime: string = ""
    endTime: string = ""
    timeSheetDate: string = ""
    timeAdded: string = ""
    minutes: number = 0
    comment: string = ""
    tlComments: string = ""
    taskStatus: string = ""
    flog: boolean = false
    isAuto: boolean = false
  }


interface trackerForm {
  project: number | null,
  notes: string ,
  status: string,
  startTime: string | null,
  endTime: string | null,
  task: number | null
}
let defaultValue = {
  project: null,
  notes: '',
  task: null,
  status: '',
  startTime: '',
  endTime: ''
}
let errorDefaultVlaue = {
  project: null,
  notes: '',
  task: null,
  status: '',
  startTime: '',
  endTime: ''
}

const TimeTrack = () => {
  const [dates, setDates] = useState<Dates>([]);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [runTime, setRunTime] = useState<number>(0);
  const [isAccOpen, setIsAccOpen] = useState<boolean>(true);
  // Show Select Values
  const [showSelectVal1, setShowSelectVal1] = useState<boolean>(false)
  const [showSelectVal2, setShowSelectVal2] = useState<boolean>(false)
  const [prjTaskList, setPrjTaskList] = useState([])
  const [prjList, setPrjList] = useState<tasklist[]>()
  const [entryList, setEntryList] = useState<tasklist[]>()
  const [totaltaskList, setTotalTaskList] = useState<projectList[]>([])
  const [taskList, setTaskList] = useState<projectList[]>([])
  const statusList = ["Done", "WIP", "OnHold"]
  const [taskStared, setTaskStarted] = useState<boolean>(false)


  

  //Get Project List
  const dispatch = useDispatch()
  const projectList = useSelector((state: any) => {
    return state.trackerReducer
  })
  const manualEntryStatus = useSelector((state:ReducersList)=>{
    return state.manualEntryReducer
  })
  const antoEntryStart = useSelector((state:ReducersList)=>{
    return state.autoEntryReducer
  })
    const stopAutoEntryStart = useSelector((resp:ReducersList)=>{
    return resp.autoEntryStopReducer
  })
    const getStartup:getStartRes = useSelector((state:ReducersList)=>{
      let  getstartRed = state.getStartReducer;
      if(getstartRed.data.projectID){
        return getstartRed.data
      }else{
      return {}  
      }      
  })
  const entryListReducer = useSelector((store:ReducersList)=> store.entryListReducer,  shallowEqual )

  const [formData, setFormData] = useState({
    project: '',
    task: '',
    status: '',
    notes: '',
    projectDesc: '',
    taskTime: '',
    isManual: false,
  });

//   useEffect(() => {
//   if (getStartup?.projectID) {
//     setTaskStarted(true);
//   }else{
//     setTaskStarted(false);
//   }
// }, [getStartup]);

  useEffect(() => {    
        dispatch(getStartRequest())    
}, [stopAutoEntryStart, antoEntryStart]);


  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning) {
      timer = setInterval(() => {
        setRunTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const timeFormat = moment.utc(runTime * 1000).format("HH:mm:ss");



  useEffect(() => {
    const initialDataPrepare = () => {
      try {
        dispatch(ProjectListRequest());
        EntryListCall()
        
        const listOfDate: Dates = [];
        let k =parseInt((window.innerWidth/100).toFixed())
        for (let i = (k+2); i > 0; i--) {
          const date = moment().subtract(i, "days").format("DD ddd");
          listOfDate.push(date);
        }
        setDates(listOfDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    initialDataPrepare();
  }, []);

  useEffect(() => {
    setPrjList(projectList.data.projectList)
    setTotalTaskList(projectList.data.taskList)
  }, [projectList])


  const today = moment();
  const todayStartOfTheDay = today.startOf('day');
  const [trackerForm, UpdateTrackerForm] = useState<trackerForm>(defaultValue)
  const [isSubmited, UpdateSubmit] = useState<boolean>(false)
  const [formErrors, UpdateErrors] = useState<trackerForm>(errorDefaultVlaue)
  const [mode, UpdateMode] = useState<boolean>(true)
  const [formUpdated, setformUpdated] = useState<boolean>(false)

  let ValidateRecord = Yup.object({
    project: Yup.number().required("Field is Required"),
    notes: Yup.string().required("Field is Required"),
    status: Yup.string().required("Field is Required"),
    task: Yup.number().required("Field is Required"),
    startTime: Yup.mixed().nullable()
    .required('Start time is required')
    .test('validTime', 'Invalid time format', (value) => value && moment(value, 'HH:mm', true).isValid()),
    endTime: Yup.mixed().nullable()
    .required("End time is required")
    .test('validTime', 'Invalid time format', (value) => value && moment(value, 'HH:mm', true).isValid()),
  })
  async function submitcall(event: any) {
    event.preventDefault()
    setformUpdated(true)
    let result;
    try {
      result = await ValidateRecord.validate(trackerForm, { abortEarly: false })
      UpdateErrors(errorDefaultVlaue)
      let startTime: any = trackerForm.startTime
      let endTime: any = trackerForm.endTime
      let endDateAndTime = moment(trackerForm.endTime).format();
      let startDateAndTime = moment(trackerForm.startTime).format();
      let minutes = endTime.diff(startTime, 'minutes')
      // let minutes = 0;
      let postData = new manualEntryData();
      postData.comment = trackerForm.notes;
      postData.endTime = endDateAndTime;
      postData.minutes = minutes;
      postData.projectID = trackerForm.project ? trackerForm.project : 0;
      postData.startTime = startDateAndTime;
      postData.taskID = trackerForm.task ? trackerForm.task : 0;
      postData.taskStatus = trackerForm.status;
      postData.timeSheetDate = startDateAndTime;
      postData.timeAdded = startDateAndTime;
      postData.tlComments = "";
      try{
      dispatch(ManualEntryRequest({
        ...postData,
        startTime: postData.startTime.toString?.() ?? postData.startTime,
        endTime: postData.endTime.toString?.() ?? postData.endTime,
        timeAdded: postData.timeAdded?.toString?.() ?? postData.timeAdded,
        timeSheetDate: postData.timeSheetDate?.toString?.() ?? postData.timeSheetDate,
      }))
      }
      catch{
      
      }
    } catch (err: any) {
      UpdateErrors(errorDefaultVlaue);
      err.inner.forEach((res: any) => {
        UpdateErrors(prev => {
          return { ...prev, [res.path]: [res.errors[0]] }
        })
      })
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
  let updateTime = (data: any, field: string) => {
    UpdateTrackerForm(prev => {
      let updatedData = { ...prev, [field]: data }
      
      return updatedData
    })
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
          
          
          return { ...prev, [res.path]: [res.errors[0]] }
        })
      })
    }
    }
    // }
  }

  function EntryListCall(){
    dispatch(completedEntryRequest(''))
    
  }
  useEffect(()=>{
  dispatch(getStartRequest())
},[])


  useEffect(() => {
    if (prjList?.length) {
      const datap: tasklist[] = entryListReducer.data;
      if (datap?.length) {
        const tasklistsp = datap?.map(resp => {
          let project = prjList?.filter((data) => data.projectID == resp.projectID)
          let task = totaltaskList?.filter((data) => data.taskID == resp.taskID)
          return { ...resp, projectName: project?.length ? project[0].projectName : '', taskName: task?.length ? task[0].title : '' }
        })
        setEntryList(tasklistsp)
      }
    }
  }, [entryListReducer, prjList])
  function postAutoEntry(postData:any){
    dispatch(AutoEntryRequest(postData))
  }
  function stopRunningTask(postData){
    dispatch(AutoEntryStopRequest(postData))
  }




  return (
    <div className="m-5">
      {entryListReducer.Loading ? 'er': 'ew'} sadasd
      { manualEntryStatus.Loading  ?? <div>loaging</div> }
      { entryListReducer.Loading  ?? <div>loaging</div> }
      
      {/* Calendar */}
      <div className="mt-4 flex gap-4  dateDayContainer">
        {dates.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-100 dateDayBox "
          >
            <div className="text-lg font-bold">{item.split(" ")[0]}</div>
            <div className="text-sm text-gray-600">{item.split(" ")[1]}</div>
          </div>
        ))}
        <button className="wave-btn currentDateBtnTxt relative overflow-hidden px-6 py-4 rounded-md">
          <span className="wave-btn__label flex items-center gap-2 relative z-10">
            <CalendarMonthIcon />
            {moment().format("MMMM Do ddd")}
          </span>
          <div className="dummyDiv">
          <span className="wave absolute pointer-events-none"></span>

          </div>
        </button>


      </div>


      {/* taskbar Section */}
      <div className="">
        <div className="d-inline">
          Trackers
        </div>
        <div className="d-inline">
          <ToggleButtonGroup
            color="primary"
            value={mode}
            sx={{
              transform: "scale(0.8)", // Reduce overall size
            }}
            exclusive
            onChange={() => UpdateMode(resp => (resp ? false : true))}
            aria-label="Mode">
            <ToggleButton value={true}>Auto</ToggleButton>
            <ToggleButton value={false}>Manual</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      {
        mode && <Autotask projectList={projectList} submitFunc={postAutoEntry} stopRunningTask={stopRunningTask} taskStared={taskStared} runningTaskDetails={getStartup}/>
      }
      {
        !mode && <div >
        {/* Form */}
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
                {taskList && taskList.map((data: projectList) => (
                  <MenuItem key={data.taskID} value={data.taskID}>
                    {data.title}
                  </MenuItem>
                ))}
              </Select>
              {/* {formErrors.project && <FormHelperText>{formErrors.project[0]}</FormHelperText>} */}
            </FormControl>
          </div>


          <div>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <FormControl fullWidth error={formErrors.startTime ? true : false} >
                {/* <InputLabel id="startDate">TimePicker</InputLabel> */}
                <TimePicker label="Start Time" onChange={(value) => updateTime(value, 'startTime')} value={trackerForm.startTime ? moment(trackerForm.startTime) : null}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      fullWidth: true,
                      placeholder: "hh:mm",
                      error: !!formErrors.startTime,
                    },
                  }}
                />
              </FormControl>
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <FormControl fullWidth error={formErrors.endTime ? true : false}>
                {/* <InputLabel id="startDate">TimePicker</InputLabel> */}
                <TimePicker label="End Time" onChange={(value) => updateTime(value, 'endTime')} value={trackerForm.endTime ? moment(trackerForm.endTime) : null}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      fullWidth: true,
                      placeholder: "hh:mm",
                      error: !!formErrors.endTime,
                    },
                  }}
                />
              </FormControl>
            </LocalizationProvider>
          </div>
          <div>

          </div>
          <div>
            <FormControl fullWidth error={formErrors.status ? true : false} >
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                value={trackerForm.status}
                label="status"
                name='status'
                onChange={formChange}
                onBlur={formBlur}
              >
                {statusList && statusList.map((data: string) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
              {/* {formErrors.status && <FormHelperText>{formErrors.status[0]}</FormHelperText>} */}
            </FormControl>
          </div>
          <div>
          {/* error={formErrors.notes ? true : false} */}
            <FormControl fullWidth >
              <TextField   error={formErrors.notes ? true : false}
                multiline
                variant="outlined"
                rows={1}
                value={trackerForm.notes}
                name='notes'
                label='Notes'
                id='notes'
                onChange={formChange}
                onBlur={formBlur}
              />
              {/* {formErrors.notes && <FormHelperText>{formErrors.notes[0]}</FormHelperText>} */}
            </FormControl>
          </div>
          <button type="submit" className="manualUpdate">
            Update
            {/* <img src="assets/update.svg" alt="Update" width={30} title="update" /> */}
          </button>
        </form>
      </div>
      }
      

      <div>
      
      </div>

      

      {/* Accordion */}
      <div className="mt-4 rounded-lg bg-gray-100 shadow-lg">
        {/* Accordion Header */}
        <h2>
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
            onClick={() => setIsAccOpen(!isAccOpen)}
          >
            <span>Today Completed Task List</span>
            <svg
              className={`w-3 h-3 transform ${isAccOpen ? "rotate-180" : "rotate-0"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>

        {/* Accordion Content */}
        {isAccOpen && (
          <div className="p-5 bg-white border border-gray-200 rounded-b-xl">
            <p className="">
              <CompletedList entrylist={entryList} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTrack;
