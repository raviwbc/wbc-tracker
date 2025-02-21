import React, { useEffect, useState } from "react";
import moment from "moment"; 
import './timeTracker.css'

type Dates = string[]; 

const TimeTrack = () => {
  const [dates, setDates] = useState<Dates>([]); 

  
  const [isRunning, setIsRunning] = useState<boolean>(false); 
  const [runTime, setRunTime] = useState<number>(0); 

 
  const [isAccOpen, setIsAccOpen] = useState<boolean>(false);

  
  const stopClock = (): void => {
    setIsRunning(!isRunning);
  };

  
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

  // Effect to populate the date list
  useEffect(() => {
    const listOfDate: Dates = [];
    for (let i = 20; i >= 0; i--) {
      const date = moment().subtract(i, "days").format("DD ddd");
      listOfDate.push(date);
    }
    setDates(listOfDate);
  }, []);

  return (
    <div className="m-5">
      {/* Header */}
      {/* <div className="flex justify-between px-3">
        <div className="flex gap-3 items-center">
          <i className="fa-solid fa-clock text-blue-500 text-2xl"></i>
          <div className="nameText">Time Tracker</div>
        </div>
        <div className="flex gap-2 items-center">
          <i className="fa-solid fa-user text-red-500 text-2xl"></i>
          <div>Sanjai G</div>
        </div>
      </div> */}

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

      {/* Stopwatch Section */}
      <div className="mt-4 flex justify-between items-center rounded-lg  p-4">
        {/* Logo */}
        <img
          src="https://www.clio.com/wp-content/uploads/2017/11/time_tracker_logo__cmyk-e1629830767918.png"
          alt="Time Tracker Logo"
          className="w-28 h-12"
        />

        {/* Stopwatch */}
        <div className="flex gap-5 items-center">
          <div className="text-2xl font-bold">{timeFormat}</div>
          <div>
            <button
              className={`mt-2 px-4 py-2 text-white rounded-md ${
                isRunning
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={stopClock}
            >
              {isRunning ? "Stop" : "Start"}
            </button>
          </div>
        </div>
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
