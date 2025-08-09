import React, { useEffect, useState } from "react";
import "./autotask.css";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import moment from "moment";
import * as Yup from "yup";
import {
  autoUpdate,
  getStartRes,
  projectListmodel,
  stopTimeSheet,
  tasklist,
} from "../../model/timetracker.ts";
import { useDispatch } from "react-redux";
import { AutoEntryRequest } from "../../store/reducers/manualEntry.ts";
import { RunningTimer } from "../timer/timer.tsx";

let errorDefaultVlaue = {
  project: null,
  task: null,
};
interface errortrackerForm {
  project: number | null;
  task: number | null;
}
interface stopErrortrackerForm {
  comments: string | null;
  status: string | null;
}

let defaultValue = {
  project: null,
  task: null,
  comments: "",
  status: "",
};
let StopdefaultValue = {
  status: null,
  comments: null,
};

interface trackerForm {
  project: number | null;
  task: number | null;
  comments: string | null;
  status: string | null;
}

type AutoTaskProps = {
  projectList: any;
  submitFunc: (postData: autoUpdate) => void;
  stopRunningTask: (potdata: stopTimeSheet) => void;
  taskStared: boolean;
  runningTaskDetails: getStartRes;
};

// export function Autotask({ projectList, submitFunc }) {
export const Autotask: React.FC<AutoTaskProps> = ({
  projectList,
  submitFunc,
  stopRunningTask,
  taskStared,
  runningTaskDetails,
}) => {
  const [formErrors, UpdateErrors] =
    useState<errortrackerForm>(errorDefaultVlaue);
  const [stopForm, stopFormUpdateErrors] =
    useState<stopErrortrackerForm>(StopdefaultValue);
  const [trackerForm, UpdateTrackerForm] = useState<trackerForm>(defaultValue);
  const [taskList, setTaskList] = useState<projectListmodel[]>([]);
  const [prjList, setPrjList] = useState<tasklist[]>();
  const [totaltaskList, setTotalTaskList] = useState<projectListmodel[]>([]);
  const [formUpdated, setformUpdated] = useState<boolean>(false);
  const [selectedProject, setProject] = useState<any>("");
  const [selectedTask, setTask] = useState<any>("");
  const statusList = ["Done", "WIP", "OnHold"];
  // const [taskStared, setTaskStared] = useState<boolean>(false)

  useEffect(() => {
    setPrjList(projectList.data.projectList);
    setTotalTaskList(projectList.data.taskList);
  }, [projectList]);

  useEffect(() => {
    if (runningTaskDetails.projectID) {
      let projname = prjList?.find((resp) => resp.projectID === runningTaskDetails.projectID)?.projectName;
      setProject(projname);
    }
  }, [prjList, runningTaskDetails]);

useEffect(() => {
  if (runningTaskDetails.projectID) {
    let taskname = totaltaskList?.find(
      (resp) => resp.taskID === runningTaskDetails.taskID
    )?.title;
    setTask(taskname);
  }
}, [totaltaskList, runningTaskDetails]);

//   useEffect(() => {
//     if (Object.keys(runningTaskDetails).length > 0) {
//       if (!selectedProject) {
//         if (runningTaskDetails.projectID) {
//             let projname = prjList?.find((resp) => resp.projectID === runningTaskDetails.projectID)?.projectName;
//             setProject(projname);
//             let taskname = totaltaskList?.find((resp) => resp.taskID === runningTaskDetails.taskID)?.title;
//             setTask(taskname);
//         }
//       }
//     }
//   }, [runningTaskDetails]);


  useEffect(() => {
console.log("taskStared from auto", taskStared)
  },[taskStared])
  


  function formReset() {
    setformUpdated(false);
    UpdateTrackerForm(defaultValue);
  }

  async function submitcall(event: any) {
    event.preventDefault();
    setformUpdated(true);
    let result;
    try {
      if (!taskStared) {
        result = await ValidateRecord.validate(trackerForm, {
          abortEarly: false,
        });
        UpdateErrors(errorDefaultVlaue);
      } else {
        result = await ValidateStopRecord.validate(trackerForm, {
          abortEarly: false,
        });
        stopFormUpdateErrors(StopdefaultValue);
      }

      let currentTime = moment().format().toString();
      if (taskStared) {
        let postData = new stopTimeSheet();
        postData.comment = trackerForm.comments ? trackerForm.comments : "";
        postData.startTime = runningTaskDetails.startTime;
        postData.taskID = runningTaskDetails.taskID;
        postData.projectID = runningTaskDetails.projectID;
        postData.id = runningTaskDetails.id;
        postData.taskStatus = trackerForm.status ? trackerForm.status : "WIP";
        postData.userID = runningTaskDetails.userID;
        postData.endTime = runningTaskDetails.startTime;
        postData.timeAdded = runningTaskDetails.startTime;
        postData.timeSheetDate = runningTaskDetails.startTime;
        stopRunningTask(postData);
        formReset();
      } else {
        let postData = new autoUpdate();
        postData.projectID = trackerForm.project ? trackerForm.project : 0;
        postData.taskID = trackerForm.task ? trackerForm.task : 0;
        postData.startTime = currentTime;
        postData.timeAdded = currentTime;
        postData.timeSheetDate = currentTime;
        submitFunc(postData);
        formReset();
      }
      // dispatch(AutoEntryRequest(postData))
    } catch (err: any) {
      if (!taskStared) {
        UpdateErrors(errorDefaultVlaue);
        err.inner.forEach((res: any) => {
          UpdateErrors((prev) => {
            return { ...prev, [res.path]: [res.errors[0]] };
          });
        });
      } else {
        stopFormUpdateErrors(StopdefaultValue);
        err.inner.forEach((res: any) => {
          stopFormUpdateErrors((prev) => {
            return { ...prev, [res.path]: [res.errors[0]] };
          });
        });
      }
    }
  }
  let formChange = (data: any) => {
    const { name, value } = data.target;
    UpdateTrackerForm((prev) => {
      return { ...prev, [name]: value };
    });
    if (value && name === "project") {
      let task = totaltaskList?.filter((resp) => resp.projectID === value);
      setTaskList(task ? task : []);
    }
  };
  let formBlur = async (data: any) => {
    let result: any;
    if (!taskStared) {
      try {
        result = await ValidateRecord.validate(trackerForm, {
          abortEarly: false,
        });
        UpdateErrors(errorDefaultVlaue);
      } catch (err: any) {
        UpdateErrors(errorDefaultVlaue);
        if (formUpdated == true) {
          err.inner.forEach((res: any) => {
            UpdateErrors((prev) => {
              return { ...prev, [res.path]: [res.errors[0]] };
            });
          });
        }
      }
    } else {
      try {
        result = await ValidateStopRecord.validate(trackerForm, {
          abortEarly: false,
        });
        stopFormUpdateErrors(StopdefaultValue);
      } catch (err: any) {
        stopFormUpdateErrors(StopdefaultValue);
        if (formUpdated == true) {
          err.inner.forEach((res: any) => {
            stopFormUpdateErrors((prev) => {
              return { ...prev, [res.path]: [res.errors[0]] };
            });
          });
        }
      }
    }
  };
  let ValidateRecord = Yup.object({
    project: Yup.number().required("Field is Required"),
    task: Yup.number().required("Field is Required"),
  });
  let ValidateStopRecord = Yup.object({
    comments: Yup.string().required("Field is Required"),
    status: Yup.string().required("Field is Required"),
  });

  return (
    <>
      <div className="main">
        <form onSubmit={submitcall}>
          {!taskStared && (
            <div className="formArea">
              <div>
                <FormControl
                  fullWidth
                  error={formErrors.project ? true : false}
                >
                  <InputLabel id="Project">Project</InputLabel>
                  <Select
                    labelId="Project"
                    value={trackerForm.project ?? ''}
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
                  {/* {formErrors.project && <FormHelperText>{formErrors.project[0]}</FormHelperText>} */}
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth error={formErrors.task ? true : false}>
                  <InputLabel id="task">Task</InputLabel>
                  <Select
                    labelId="task"
                    value={trackerForm.task ?? ''}
                    label="task"
                    name="task"
                    onChange={formChange}
                    onBlur={formBlur}
                  >
                    {taskList &&
                      taskList.map((data: projectListmodel) => (
                        <MenuItem key={data.taskID} value={data.taskID}>
                          {data.title}
                        </MenuItem>
                      ))}
                  </Select>
                  {/* {formErrors.project && <FormHelperText>{formErrors.project[0]}</FormHelperText>} */}
                </FormControl>
              </div>
              <button className="manualUpdate" type="submit">
                {" "}
                {!taskStared ? "Start Task" : "Complete Task"}{" "}
              </button>
            </div>
          )}
          {taskStared && (
            <>
              {selectedProject && (
                <div className="proj_details">
                  <div className="proj">Project : {selectedProject}</div>
                  <div className="proj">Task : {selectedTask}</div>
                </div>
              )}
              <div className="autoForm">
                <div>
                  <RunningTimer startTime={runningTaskDetails.startTime} />
                </div>
                <div>
                  <FormControl fullWidth error={stopForm.status ? true : false}>
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
                  {/* {stopForm.comments} */}
                  <FormControl
                    fullWidth
                    error={stopForm.comments ? true : false}
                  >
                    <TextField
                      label="Notes"
                      value={trackerForm.comments}
                      error={stopForm.comments ? true : false}
                      variant="outlined"
                      name="comments"
                      onChange={formChange}
                      onBlur={formBlur}
                    />
                  </FormControl>
                </div>

                <button className="manualUpdate" type="submit">
                  {!taskStared ? "Start Task" : "Complete Task"}
                </button>
               
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};
