import React from "react"
import moment from "moment"
import './completedList.css'

interface taskListt{
    project  :string;
    task  :string;
    stateTime  :string;
    endTime  :string;
    Status :string;
}

const taskList:taskListt[] = [{
    project : 'EXO Office',
    task : "CR-Angular 17 to 19 Convertion",
    stateTime : "10:20:00",
    endTime : "11:20:00",
    Status: "WIP"
    
},
{
    project : 'EXO Office',
    task : "Meeting With LTI Team",
    stateTime : "11:20:00",
    endTime : "13:00:00",
    Status: "Done"
    
},
{
    project : 'Interval',
    task : "Lunch",
    stateTime : "13:00:00",
    endTime : "14:00:00",
    Status: "Done"
    
},{
    project : 'EXO Office',
    task : "CR-Angular 17 to 19 Convertion",
    stateTime : "14:00:00",
    endTime : "15:30:00",
    Status: "WIP"
    
},]



export const CompletedList = ()=>{
    return <div>         
        <div className="taskListTable">
            {
                taskList.map((resp:taskListt)=>(
                    <div className="parent_div">
                    <div>{resp.task} - <span data-status={resp.project}>{resp.project}</span></div>
                    <div>
                        <span data-status={resp.Status} className="status">
                        {resp.Status}
                        </span>
                    </div>
                    <div>{resp.stateTime} - {resp.endTime}</div>
                    <div>Total Hours</div>
                    <div>action</div>
                    </div>
                ))
            }
        </div>
    </div>
}