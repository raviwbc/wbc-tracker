import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import * as Yup from "yup";
import { useLocation, useNavigate } from 'react-router-dom';
import "./timeTracker.css";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { CompletedList } from "./completedTaskList/completedList.tsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ProjectListRequest } from "../store/reducers/timeTracker.ts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  AutoEntryRequest,
  AutoEntryStopRequest,
  getStartRequest,
  ManualEntryRequest,
} from "../store/reducers/manualEntry.ts";
import { completedEntryRequest } from "../store/reducers/todayCompletedList.ts";
import { getStartRes, manualEntryData, ReducersList, tasklist, trackerForm, projectList } from "../model/timetracker.ts";
import { Autotask } from "./autoTask/autotask.tsx";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { toast, Toaster } from "react-hot-toast";
import TimePk from "./time-picker/time-picker.tsx";

type Dates = { dateString: string, paramsday: string };

let defaultValue = {
  project: 0,
  notes: '',
  task: 0,
  status: '',
  startTime: '',
  endTime: '',
  hours:''
}
let errorDefaultVlaue = {
  project: 0,
  notes: '',
  task: 0,
  status: '',
  startTime: '',
  endTime: '',
  hours:''
}


const TimeTrack = () => {
  const [dates, setDates] = useState<Dates[]>();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isAccOpen, setIsAccOpen] = useState<boolean>(true);
  const [prjList, setPrjList] = useState<tasklist[]>();
  const [entryList, setEntryList] = useState<tasklist[]>();
  const [totaltaskList, setTotalTaskList] = useState<projectList[]>([]);
  const [taskList, setTaskList] = useState<projectList[]>([]);
  const statusList = ["Done", "WIP", "OnHold"];
  const [taskStared, setTaskStarted] = useState<boolean>(false);
  const [selectedDate, updateSelectedDate] = useState<string | null>('');
  const location = useLocation();
  const navigate = useNavigate();

  //Get Project List
  const dispatch = useDispatch();
  const projectList = useSelector((state: any) => {
    return state.trackerReducer
  })
  const manualEntryStatus = useSelector((state: ReducersList) => {
    return state.manualEntryReducer
  })
  const antoEntryStart = useSelector((state: ReducersList) => {
    return state.autoEntryReducer
  })
  const stopAutoEntry = useSelector((resp: ReducersList) => {
    return resp.autoEntryStopReducer
  })
  const getStartup: getStartRes = useSelector((state: ReducersList) => {
    let getstartRed = state.getStartReducer;
    if (getstartRed.data.projectID) {
      return getstartRed.data
    } else {
      return {}
    }
  })
  const entryListReducer = useSelector((store: ReducersList) => store.entryListReducer, shallowEqual)

  const [formData, setFormData] = useState({
    project: "",
    task: "",
    status: "",
    notes: "",
    projectDesc: "",
    taskTime: "",
    isManual: false,
  });

  function resetManualForm() {
    UpdateTrackerForm(defaultValue)
    UpdateErrors(errorDefaultVlaue)
    toast.success("Your entry updated successfully", { duration: 3000 });
    EntryListCall();
  }

  const today = moment();
  const [trackerForm, UpdateTrackerForm] = useState<trackerForm>(defaultValue);  
  const [formErrors, UpdateErrors] = useState<trackerForm>(errorDefaultVlaue);
  const [mode, UpdateMode] = useState<boolean>(true);
  const [formUpdated, setformUpdated] = useState<boolean>(false);
  const [submitclick, formSubmitClicked] = useState<boolean>(false);

  let ValidateRecord = Yup.object({
    project: Yup.number().required("Field is Required"),
    notes: Yup.string().required("Field is Required"),
    status: Yup.string().required("Field is Required"),
    task: Yup.number().required("Field is Required"),
    startTime: Yup.mixed()
      .nullable()
      .required("Start time is required")
      .test(
        "validTime",
        "Invalid time format",
        (value) => value && moment(value, "HH:mm", true).isValid()
      ),
    endTime: Yup.mixed()
      .nullable()
      .required("End time is required")
      .test(
        "validTime",
        "Invalid time format",
        (value) => value && moment(value, "HH:mm", true).isValid()
      ).test(
        "endAfterStart",
        "End time must be after start time",
        function(){
          console.log('raviuu')
          const {startTime, endTime} = this.parent;
           let end = moment(endTime)
           if (!startTime || !endTime) return true
           console.log('raviuu', end.diff(startTime, "minutes"))
            return end.diff(startTime, "minutes") > 0;
        }

      )
      ,
      
  });
  function dateFormatFunction(momentDate) {
    const hours = momentDate.hour();
    const minutes = momentDate.minute();
    const seconds = momentDate.second();
    let newDate = moment(selectedDate, "MM-DD-YYYY");
    newDate.hour(hours).minute(minutes).second(seconds);
    return newDate
  }
    function errorToaster(){
    let formData = formErrors
    for(let err in formData){
      if(formData[err]){
        toast.error(`${err}: ${formData[err][0]}`, { duration: 3000 });
      }
    }
  }

  async function submitcall(event: any) {
    event.preventDefault();
    setformUpdated(true);
    formSubmitClicked(true);
    let result;
    try {
      result = await ValidateRecord.validate(trackerForm, {
        abortEarly: false,
      });
      UpdateErrors(errorDefaultVlaue);
      SetstTime24Hrs('')
      SetedTime24Hrs('')
      debugger
      let startTime: any = trackerForm.startTime;
      let endTime: any = trackerForm.endTime;
      if(selectedDate){
        debugger
        startTime = dateFormatFunction(startTime)
        endTime = dateFormatFunction(endTime)
      }
      

      
      let endDateAndTime = moment(endTime).format();
      let startDateAndTime = moment(startTime).format();
      let minutes = endTime.diff(startTime, "minutes");
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
      try {
        dispatch(
          ManualEntryRequest({
            ...postData,
            startTime: postData.startTime.toString?.() ?? postData.startTime,
            endTime: postData.endTime.toString?.() ?? postData.endTime,
            timeAdded: postData.timeAdded?.toString?.() ?? postData.timeAdded,
            timeSheetDate:
              postData.timeSheetDate?.toString?.() ?? postData.timeSheetDate,
          })
        );
      } catch { }
    } catch (err: any) {
      UpdateErrors(errorDefaultVlaue);
      err.inner.forEach((res: any) => {
        UpdateErrors((prev) => {
          return { ...prev, [res.path]: [res.errors[0]] };
        });
      });
    }
  }

  let formChange = (data: any) => {
    const { name, value } = data.target;
    UpdateTrackerForm((prev) => {
      return { ...prev, [name]: value };
    });
    if (value && name == "project") {
      let task = totaltaskList?.filter((resp) => resp.projectID == value);
      setTaskList(task ? task : []);
    }
  };

  let formBlur = async (data: any) => {
    debugger
    const {name, value} = data
    let result: any;
    try {
      result = await ValidateRecord.validate(trackerForm, {
        abortEarly: false,
      });
      UpdateErrors(errorDefaultVlaue);
    } catch (err: any) {
      if (formUpdated == true) {
        UpdateErrors(errorDefaultVlaue);
        err.inner.forEach((res: any) => {
          UpdateErrors((prev) => {
            return { ...prev, [res.path]: [res.errors[0]] };
          });
        });
      }
    }
    // }
  };

  function isValidDate(dateStr) {
    const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-(\d{4})$/;
    if (!regex.test(dateStr)) return false;
    const [month, day, year] = dateStr.split('-').map(Number);
    const date = new Date(`${year}-${month}-${day}`);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  }

  function EntryListCall() {
    debugger
    const searchParams = new URLSearchParams(location.search);
    const selectedDateLocal = searchParams.get('date');
    if (isValidDate(selectedDateLocal)) {
      updateSelectedDate(isValidDate(selectedDateLocal) ? selectedDateLocal : '')
      UpdateMode(false)
      dispatch(completedEntryRequest(isValidDate(selectedDateLocal) ? selectedDateLocal : ''));
    }

  }

  function postAutoEntry(postData: any) {
    dispatch(AutoEntryRequest({ ...postData }))
  }
  function stopRunningTask(postData) {
    dispatch(AutoEntryStopRequest({ ...postData }))
  }

  function taskUpdated() {
    if (stopAutoEntry.data?.didError == false && stopAutoEntry.Loading == false) {
      toast.success("Task updated", { duration: 3000 });
      dispatch(completedEntryRequest(isValidDate(selectedDate) ? selectedDate : ''));
      setTaskStarted(false)
    } else if (stopAutoEntry.data?.didError == true && stopAutoEntry.Loading == false) {
      toast.error(stopAutoEntry.data.message || "Something went wrong!", { duration: 3000 });
    }
  }
  const callcompletedList = (date) => {
    UpdateTrackerForm(errorDefaultVlaue)
    SetstTime24Hrs('')
    SetedTime24Hrs('')
    if(moment().format('MM-DD-YYYY') == date){
      callCurrentDate()
    }else{
    updateSelectedDate(date);
    UpdateMode(false);
    navigate(`/index?date=${date}`);
  }
  }
  const callCurrentDate = () => {
    updateSelectedDate('');
    UpdateMode(true);
    navigate(`/index`);
  }


  // Time Picker Logic
  const [pickerStartValue, setpickerStartValue] = useState<Moment | null>(
    moment().hour(12).minute(0)
  );
  const [pickerEndValue, setpickerEndValue] = useState<Moment | null>(
    moment().hour(12).minute(0)
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);

  const stTimeopen = Boolean(anchorEl);
  const edTimeopen = Boolean(anchorE2);

  const [stTime24Hrs, SetstTime24Hrs] = useState("");
  const [edTime24Hrs, SetedTime24Hrs] = useState("");

  const handleIconClick = async (event, type: number) => {
    try {
      if (type === 1) {
        setAnchorEl(event.currentTarget);
      }

      if (type === 2 ) {
        if(trackerForm.startTime){
          UpdateErrors(errorDefaultVlaue);
        setAnchorE2(event.currentTarget);
        } else {
        await ValidateRecord.validateAt('startTime', trackerForm, {
          abortEarly: false,
        });
      }
        
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = { ...errorDefaultVlaue };

        err.inner.forEach((e) => {
          if (e.path && e.message) {
            errors[e.path] = e.message;
          }
        });

        UpdateErrors(errors);
      } else {
        console.error("Unexpected error during validation:", err);
      }
    }
  };

  const handleClose = (type: number) => {
    type === 1 ? setAnchorEl(null) : setAnchorE2(null);
  };

  const getStartPickerData = (time) => {
    debugger
    if (time) {
      UpdateTrackerForm((resp) => {
        return { ...resp, startTime: time };
      });      
      setpickerStartValue(time);
      SetstTime24Hrs(moment(time).format("hh:mm A"));
      setAnchorEl(null);
    } else {
      setAnchorEl(null);
    }
  };
  const getEndPickerData = (time) => {
    debugger;
    if (time) {
      UpdateTrackerForm((resp) => {
        return { ...resp, endTime: time };
      });
      setpickerEndValue(time);
      SetedTime24Hrs(moment(time).format("hh:mm A"));
      setAnchorE2(null);
      checkDifferentInUpdatedTime(trackerForm.startTime, time)
      updateErrorOnendTime()
    } else {
      setAnchorE2(null);
    }
  };
    async function updateErrorOnendTime(){          
          try {
      await ValidateRecord.validate(trackerForm, {
        abortEarly: false,
      });
      UpdateErrors(errorDefaultVlaue);
    } catch (err: any) {
      UpdateErrors(errorDefaultVlaue);
        err.inner.forEach((res: any) => {          
          UpdateErrors((prev) => {
            return res.path == 'endTime' ?  { ...prev, [res.path]: [res.errors[0]] } : prev;  
          });
        });
      }
    }
  function checkDifferentInUpdatedTime(startTime:any, endTime:any){
    if(startTime && endTime){
      debugger
        const diffInMinutes = endTime.diff(startTime, "minutes");
        const duration = moment.duration(diffInMinutes, 'minutes');
        // const formattedTime = moment.utc(duration.asMilliseconds()).format('HH:mm'); 
        const abs = moment.utc(Math.abs(duration.asMilliseconds())).format("HH:mm");
     
        UpdateTrackerForm((resp)=>{
          return {...resp, hours : (diffInMinutes < 0 ? `-${abs}` : abs)}
        })
      }
  }

  // End
  useEffect(() => {
    dispatch(getStartRequest());
  }, []);

  useEffect(() => {
    debugger
    if (prjList?.length) {
      const datap: tasklist[] = entryListReducer.data;
      if (datap?.length !== entryList?.length) {
        const tasklistsp = datap?.map((resp) => {
          let project = prjList?.filter(
            (data) => data.projectID === resp.projectID
          );
          let task = totaltaskList?.filter(
            (data) => data.taskID === resp.taskID
          );
          return {
            ...resp,
            projectName: project?.length ? project[0].projectName : "",
            taskName: task?.length ? task[0].title : "",
          };
        });
        const finalCmpTask = tasklistsp?.filter((res)=>res.endDate && res.taskStatus)
        setEntryList(finalCmpTask);
      }
    }
  }, [entryListReducer, prjList])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectedDateLocal = searchParams.get('date');
    dispatch(completedEntryRequest(isValidDate(selectedDateLocal) ? selectedDateLocal : ''));
  }, [location.search]);

  useEffect(() => {
    debugger
    console.log(manualEntryStatus);
    if (manualEntryStatus.Loading == false) {
      if (manualEntryStatus.data?.didError == false) {
        resetManualForm();
      } else if (manualEntryStatus.data?.didError == true) {
        toast.error(manualEntryStatus.message || "Something went wrong!", { duration: 3000 });
      }
    }
  }, [manualEntryStatus])

  useEffect(() => {
    if (getStartup?.projectID) {
      setTaskStarted(true);
    }
  }, [getStartup]);

  useEffect(() => {
    dispatch(getStartRequest())
    console.log(stopAutoEntry)
    if (stopAutoEntry.data?.message) {
      taskUpdated()
    }
  }, [stopAutoEntry, antoEntryStart]);
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning) {
      timer = setInterval(() => {
        // setRunTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    const initialDataPrepare = () => {
      try {
        dispatch(ProjectListRequest());
        EntryListCall();

        const listOfDate: Dates[] = [];
        let k = (window.innerWidth - 40 - 190) / 75;
        k = Math.floor(k)
        let data = (window.innerWidth - 40 - 190) / 75
        for (let i = k; i >= 0; i--) {
          const date = moment().subtract(i, "days").format("DD ddd");
          const fulldate = moment().subtract(i, "days").format("MM-DD-YYYY");
          listOfDate.push({ dateString: date, paramsday: fulldate });
        }
        console.log(listOfDate)
        setDates(listOfDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    initialDataPrepare();
  }, []);

  useEffect(() => {
    setPrjList(projectList.data.projectList);
    setTotalTaskList(projectList.data.taskList);
  }, [projectList]);

  useEffect(()=>{
    if(submitclick){
    let formData = formErrors
    for(let err in formData){
      if(formData[err]){
        toast.error(`${err}: ${formData[err][0]}`, { duration: 3000 });
      }
    }
    formSubmitClicked(false)
  }
  },[formErrors])


    




  return (
    <div className="margin-20">
      {/* Calendar */}
      <div className="mt-4 flex gap-4  dateDayContainer">
        {dates?.map((item, index) => (
          selectedDate != item.paramsday && (dates.length != index+1 || selectedDate) ? (
            <div onClick={() => callcompletedList(item.paramsday)}
              key={index}
              className="flex flex-col items-center bg-gray-100 dateDayBox "
            >
              <div className="text-lg font-bold">{item.dateString.split(" ")[0]}</div>
              <div className="text-sm text-gray-600">{item.dateString.split(" ")[1]}</div>
            </div>) : (

            <button className="wave-btn currentDateBtnTxt relative overflow-hidden px-6 py-4 rounded-md">
              <span className="wave-btn__label flex items-center gap-2 relative z-10">
                <CalendarMonthIcon />
                {moment(item.paramsday).format("MMMM Do ddd")}
              </span>
              <div className="dummyDiv">
                <span className="wave absolute pointer-events-none"></span>
              </div>
            </button>)
        ))}

      </div>

      {/* taskbar Section */}
      <div className="mt-4">
        <div className="d-inline">Trackers</div>
        {!selectedDate && <div className="d-inline">
          <ToggleButtonGroup
            color="primary"
            value={mode}
            sx={{
              transform: "scale(0.8)", // Reduce overall size
            }}
            exclusive
            onChange={() => UpdateMode((resp) => (resp ? false : true))}
            aria-label="Mode"
          >
            <ToggleButton value={true}>Auto</ToggleButton>
            <ToggleButton value={false}>Manual</ToggleButton>
          </ToggleButtonGroup>
        </div>}
      </div>
      {mode && (
        <Autotask
          projectList={projectList}
          submitFunc={postAutoEntry}
          stopRunningTask={stopRunningTask}
          taskStared={taskStared}
          runningTaskDetails={getStartup}
        />
      )}
      {!mode && (
        <div>
          <form onSubmit={submitcall} className="formArea">
            <div>
              <FormControl fullWidth error={formErrors.project ? true : false}>
                <InputLabel id="Project">Project</InputLabel>
                <Select
                  labelId="Project"
                  value={trackerForm.project}
                  label="Project"
                  name="project"
                  onChange={formChange}
                  onBlur={formBlur}
                >
                  {prjList &&
                    prjList.map((data) => (
                      <MenuItem key={data.projectID} value={data.projectID}>
                        {data.projectName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth error={formErrors.task ? true : false}>
                <InputLabel id="task">Task</InputLabel>
                <Select
                  labelId="task"
                  value={trackerForm.task}
                  label="task"
                  name="task"
                  onChange={formChange}
                  onBlur={formBlur}
                >
                  {taskList &&
                    taskList.map((data: projectList) => (
                      <MenuItem key={data.taskID} value={data.taskID}>
                        {data.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            
            <FormControl fullWidth error={formErrors.startTime ? true : false}>
              <TextField
                label="Start Time"
                value={stTime24Hrs}
                onClick={(event) => handleIconClick(event, 1)}
                fullWidth
                variant="outlined"
                placeholder="hh:mm"
                error={!!formErrors.startTime}
                // error={!!error}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(event) => handleIconClick(event, 1)}
                      >
                        <AccessTimeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Popover
                open={stTimeopen}
                anchorEl={anchorEl}
                onClose={() => handleClose(1)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <TimePk
                  selectedTime={pickerStartValue}
                  onTimeSelect={getStartPickerData}
                  selectedStartTime=""
                />
              </Popover>
            </FormControl>

           
            <div>
              <FormControl fullWidth error={formErrors.endTime ? true : false}>
                <TextField
                  label="End Time"
                  value={edTime24Hrs}
                  onClick={(event) => handleIconClick(event, 2)}
                  fullWidth
                  variant="outlined"
                  placeholder="hh:mm"
                  error={!!formErrors.endTime}
                  // error={!!error}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={(event) => handleIconClick(event, 2)}
                        >
                          <AccessTimeIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Popover
                  open={edTimeopen}
                  anchorEl={anchorE2}
                  onClose={() => handleClose(2)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                  <TimePk
                    selectedTime={pickerEndValue}
                    onTimeSelect={getEndPickerData}
                    selectedStartTime={trackerForm.startTime}
                  />
                </Popover>
              </FormControl>
            </div>
            <div>
              {trackerForm.hours}
            </div>
            <div>
              <FormControl fullWidth error={formErrors.status ? true : false}>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  value={trackerForm.status}
                  label="status"
                  name="status"
                  onChange={formChange}
                  onBlur={formBlur}
                >
                  {statusList &&
                    statusList.map((data: string) => (
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
              <FormControl fullWidth>
                <TextField
                  error={formErrors.notes ? true : false}
                  multiline
                  variant="outlined"
                  rows={1}
                  value={trackerForm.notes}
                  name="notes"
                  label="Notes"
                  id="notes"
                  onChange={formChange}
                  onBlur={formBlur}
                />
              </FormControl>
            </div>
            <button type="submit" className="manualUpdate">Update</button>
          </form>
        </div>
      )}

      <div></div>
      <div className="mt-4 rounded-lg bg-gray-100 shadow-lg">
        <h2>
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
            onClick={() => setIsAccOpen(!isAccOpen)}
          >
            <span>Today Completed Task List</span>
            <svg enableBackground="new 0 0 100 100"
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
            <div className="">
              <CompletedList entrylist={entryList} date={selectedDate} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};




export default TimeTrack;
