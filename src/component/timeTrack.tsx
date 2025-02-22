import React, { useEffect, useState } from "react";
import moment from "moment";

// form 
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';

import './timeTracker.css'
import { Button, FormControl, FormControlLabel, FormHelperText, InputLabel, List, MenuItem, Select, Switch, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ProjectListRequest } from "../store/reducers/timeTracker.ts";

type Dates = string[];

const TimeTrack = () => {
  const [dates, setDates] = useState<Dates>([]);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [runTime, setRunTime] = useState<number>(0);

  const [isAccOpen, setIsAccOpen] = useState<boolean>(false);

  // Show Select Values
  const [showSelectVal1, setShowSelectVal1] = useState<boolean>(false)
  const [showSelectVal2, setShowSelectVal2] = useState<boolean>(false)

  const [prjTaskList,setPrjTaskList] = useState([])
  const [prjList,setPrjList] = useState([])
  const [TaskList,setTaskList] = useState([])

  //Get Project List
  const dispatch = useDispatch()
  const projectList = useSelector((state: any) => {    
    return state.trackerReducer
  })

  const [formData, setFormData] = useState({
    project: '',
    task: '',
    status: '',
    notes: '',
    projectDesc: '',
    taskTime: '',
    isManual: false,
  });



  // UI Project Name and task
  const [prjDesc, setPrjDesc] = useState('')
  const [task, setTask] = useState('')
  const [taskTime, setTaskTime] = useState('')



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
        dispatch(ProjectListRequest())
        // Effect to populate the date list
        const listOfDate: Dates = [];
        for (let i = 23; i >= 0; i--) {
          const date = moment().subtract(i, "days").format("DD ddd");
          listOfDate.push(date);
        }
        
        setDates(listOfDate);

        // Get the project List
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    initialDataPrepare();
  }, []);

useEffect(()=>{
  setPrjList(projectList.data.projectList)
  setTaskList(projectList.data.taskList)
  console.log('prjList',projectList.data.projectList);
},[projectList])
  // Form
  const validationSchema = () => {
    if (!isRunning) {
      return Yup.object({
        project: Yup.string().required('Please select this project!'),
        task: Yup.string().required("This field is required!"),
      });
    } else {
      return Yup.object({
        status: Yup.number().required("Please select the status!"),
        notes: Yup.string().required("Please add notes!"),
      });

    }
  };


  return (
    <div className="m-5">
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
        <button className="bg-blue-500  px-4  rounded-md hover:bg-blue-600 currentDateBtnTxt">
          {moment().format("MMMM DD ddd")}
        </button>
      </div>

      {/* taskbar Section */}
      <div >
        {/* Form */}
        <Formik
          initialValues={{ project: '', task: '', status: '', notes: '', isManual: false }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            debugger;
            if (!isRunning) {
              setShowSelectVal1(false);
              if (values.project && values.task) {
                setShowSelectVal1(true);
                let prjDesc = projectList.filter((res: any) => res.ProjectID == values.project)[0].Description
                setPrjDesc(prjDesc)
                //Same thing we need to get the task descriptiona also for UI
              }
            } else {
              setShowSelectVal1(false);
              setFormData({
                project: values.project,
                task: values.task,
                status: values.status,
                notes: values.notes,
                projectDesc: prjDesc,
                taskTime: timeFormat,
                isManual: values.isManual,
              });
              setRunTime(0)
              resetForm()
            }
            setIsRunning(!isRunning);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="mt-4 flex justify-between rounded-lg p-4">
              <div className="flex gap-3">
                {showSelectVal1 && <div><h1>{prjDesc}</h1></div>}

                {!isRunning && !showSelectVal1 && !showSelectVal2 && (
                  <div className="flex gap-3">
                    {/* Project Dropdown */}
                    <div>
                      <FormControl error={formik.touched.project && Boolean(formik.errors.project)} className="formControls">
                        <InputLabel>Project</InputLabel>
                        <Field
                          name="project"
                          as={Select}
                          label="Project"
                          value={formik.values.project}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          {prjList.map((data:any) => (
                            <MenuItem key={data.projectID} value={data.ProjectID}>
                              {data.title}
                            </MenuItem>
                          ))}
                        </Field>
                        <FormHelperText>{formik.touched.project && formik.errors.project}</FormHelperText>
                      </FormControl>
                    </div>

                    {/* Task Dropdown */}
                    <div>
                      <FormControl className="formControls" error={formik.touched.task && Boolean(formik.errors.task)}>
                        <InputLabel>Task</InputLabel>
                        <Field
                          name="task"
                          as={Select}
                          label="Task"
                          value={formik.values.task}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <MenuItem value="Task1">Task 1</MenuItem>
                          <MenuItem value="Task2">Task 2</MenuItem>
                          <MenuItem value="Task3">Task 3</MenuItem>
                        </Field>
                        <FormHelperText>{formik.touched.task && formik.errors.task}</FormHelperText>
                      </FormControl>
                    </div>
                  </div>
                )}

                {isRunning && !showSelectVal2 && (
                  <div className="flex gap-3">
                    {/* Status Dropdown */}
                    <div>
                      <FormControl className="formControls" error={formik.touched.status && Boolean(formik.errors.status)}>
                        <InputLabel>Status</InputLabel>
                        <Field
                          name="status"
                          as={Select}
                          label="Status"
                          value={formik.values.status}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <MenuItem value={1}>WIP</MenuItem>
                          <MenuItem value={2}>Done</MenuItem>
                        </Field>
                        <FormHelperText>{formik.touched.status && formik.errors.status}</FormHelperText>
                      </FormControl>
                    </div>

                    {/* Notes Textarea */}
                    <div>
                      <Field
                        name="notes"
                        as={TextField}
                        label="Notes"
                        placeholder="Enter your notes here"
                        value={formik.values.notes}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        multiline
                        rows={1}
                        className="formControls"
                        error={formik.touched.notes && Boolean(formik.errors.notes)}
                        helperText={formik.touched.notes && formik.errors.notes}
                      />
                    </div>
                  </div>
                )}

                {/* Manual Switch */}
                {/* <div className="m-2 toggleContain">
                  <Field name="isManual">
                    {({ field, form }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            {...field}
                            checked={field.value}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                          />
                        }
                        label="Manual"
                      />
                    )}
                  </Field>
                </div> */}
              </div>

              {/* Stopwatch */}
              <div className="flex gap-5">
                <div className="text-2xl font-bold mt-3">{timeFormat}</div>
                <div>
                  <button
                    type="submit"
                    className={`mt-2 px-4 py-2 text-white rounded-md ${isRunning ? "stopBtn clicked" : "startBtn"}`}
                  >
                    {isRunning ? "Stop" : "Start"}
                    {isRunning ? <i className="fa-solid fa-pause ml-1"></i> : <i className="fa-solid fa-play ml-1"></i>}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>


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
            <span>Today</span>
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
          <div className="p-5 border border-gray-200 rounded-b-xl">
            <p className="text-gray-600">
              This is the content inside the accordion. Click the header to toggle it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTrack;
