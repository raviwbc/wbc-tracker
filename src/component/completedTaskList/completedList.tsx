import React from "react"
import moment from "moment"
import './completedList.css'
import { ReducersList, tasklist } from "../../model/timetracker.ts";
import { useDispatch } from "react-redux";
import { deleteRequest } from "../../store/reducers/todayCompletedList.ts";



// interface taskListt{
//     project  :string;
//     task  :string;
//     stateTime  :string;
//     endTime  :string;
//     Status :string;
// }

// const taskList:taskListt[] = [{
//     project : 'EXO Office',
//     task : "CR-Angular 17 to 19 Convertion",
//     stateTime : "2025-02-22T11:20:35.038Z",
//     endTime : "2025-02-22T12:20:35.038Z",
//     Status: "WIP"
    
// },
// {
//     project : 'EXO Office',
//     task : "Meeting With LTI Team",
//     stateTime : "2025-02-22T12:20:35.038Z",
//     endTime : "2025-02-22T13:20:35.038Z",
//     Status: "Done"
    
// },
// {
//     project : 'Interval',
//     task : "Lunch",
//     stateTime : "2025-02-22T13:20:35.038Z",
//     endTime : "2025-02-22T14:20:35.038Z",
//     Status: "Done"
    
// },{
//     project : 'EXO Office',
//     task : "CR-Angular 17 to 19 Convertion",
//     stateTime : "2025-02-22T14:20:35.038Z",
//     endTime : "2025-02-22T15:10:35.038Z",
//     Status: "WIP"
    
// },]


const returnHours = (endDate, startDate)=>{
    const diffInMilliseconds = moment(endDate).diff(moment(startDate));

    const duration = moment.duration(diffInMilliseconds);

    // Format the duration as HH:mm:ss
    return `${String(duration.hours()).padStart(2, '0')}:${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}`;
}

function minutesConverter(min:number){
    let duration = moment.duration(min, 'minutes')
    return `${String(duration.hours()).padStart(2, '0')}:${String(duration.minutes()).padStart(2, '0')}`;
}




export const CompletedList = ({entrylist})=>{
    const dispatch = useDispatch()
    function deletefun(id:number | null){
        console.log(id)
        dispatch(deleteRequest(id))
        
        }
    return <div>         
        <div className="taskListTable">
            {
                entrylist && entrylist.map((resp:tasklist)=>(

                    <div key={resp.taskID + resp.minutes + (Math.random() * 10)} className="parent_div">
                    <div>{resp.taskName} - <span data-status={resp.projectName}>{resp.projectName}</span></div>
                    
                    
                    <div><img title={resp.autoUpdate ? 'Auto Entry' :'Manual Entry'} src={resp.autoUpdate ?'/assets/happy.svg':'/assets/angry.svg'} width={30} alt="Delete" /></div>
                    <div>
                        <span data-status={resp.taskStatus} className="status">
                        {resp.taskStatus}
                        </span>
                    </div>
                    {/* <div>{ moment(resp.startTime).format('HH:mm')} - {moment(resp.endTime).format('HH:mm')  }</div> */}
                    <div>{resp.startTime} - {resp.endTime}</div>
                     {/* returnHours(resp.endTime,resp.startTime) */}
                    <div>{minutesConverter(resp.minutes)}</div>
                    
                    <div>
                        <button onClick={()=> deletefun(resp.id)}><img src="/assets/delete.svg" width={35} alt="Delete" /></button>
                    </div>
                    </div>
                ))
            }
        </div>
    </div>
}
CompletedList.propTypes = { 
    entrylist : tasklist
  };