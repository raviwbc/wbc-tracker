import React, { useEffect, useState } from "react";
import moment from "moment";
import "./completedList.css";
import { tasklist } from "../../model/timetracker.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  completedEntryRequest,
  deleteRequest,
} from "../../store/reducers/todayCompletedList.ts";
import { toast } from "react-hot-toast";
import CommentsHover from "./commentsHover.tsx";

function minutesConverter(min: number) {
  let duration = moment.duration(min, "minutes");
  return `${String(duration.hours()).padStart(2, "0")}:${String(
    duration.minutes()
  ).padStart(2, "0")}`;
}

export const CompletedList = ({ entrylist, date }) => {
  const [isCommentShowID, setisCommentShowID] = useState();
  const dispatch = useDispatch();
  const deleteOperation = useSelector((state: any) => {
    return state.deleteTaskReducer;
  });

  function deletefun(id: number | null) {
    console.log(id);
    dispatch(deleteRequest(id));
  }

  useEffect(() => {
    if (
      deleteOperation.data?.didError === false &&
      deleteOperation.Loading === false
    ) {
      toast.success("Your entry updated successfully", { duration: 3000 });
      dispatch(completedEntryRequest(date));
    } else if (
      deleteOperation.data?.didError === true &&
      deleteOperation.Loading === false
    ) {
      toast.error(deleteOperation.data.message || "Something went wrong!", {
        duration: 3000,
      });
    }
  }, [deleteOperation]);

  return (
    <div>
      <div className="taskListTable ">
        {entrylist ? (
          entrylist.map((resp: tasklist, index) => (
            <div
              key={resp.taskID + resp.minutes + Math.random() * 10}
              className="parent_div"
            >
              <div>
                <button onClick={() => deletefun(resp.id)}>
                  <img src="/assets/delete.svg" width={35} alt="Delete" />
                </button>
              </div>
              <div>
                {resp.taskName} -{" "}
                <span data-status={resp.projectName}>{resp.projectName}</span>
              </div>
              <div>
                <img
                  title={resp.isAuto ? "Auto Entry" : "Manual Entry"}
                  src={resp.isAuto ? "/assets/happy.svg" : "/assets/angry.svg"}
                  width={30}
                  alt="Delete"
                />
              </div>
              <div>
                <span data-status={resp.taskStatus} className="status">
                  {resp.taskStatus}
                </span>
              </div>
              {/* <div>{ moment(resp.startTime).format('HH:mm')} - {moment(resp.endTime).format('HH:mm')  }</div> */}
              <div>
                {resp.startTime} - {resp.endTime}
              </div>
              {/* returnHours(resp.endTime,resp.startTime) */}
              <div>{minutesConverter(resp.minutes)}</div>
              <div className="cursor-pointer relative">
                <img
                  src="/icon/notes.svg"
                  width={30}
                  height={30}
                  alt=""
                  onMouseEnter={() => setisCommentShowID(index)}
                  onMouseLeave={() => setisCommentShowID(index)}
                />
                {isCommentShowID === index && (
                  <div>
                    <CommentsHover commentsTxt = {resp.comment || ''} />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="nrf">No Record Found</div>
        )}
      </div>
    </div>
  );
};
