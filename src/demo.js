import React, { useEffect, useState } from "react";
import moment from "moment";

export default function App() {
  const [dates, setDates] = useState([]);

  // Stopwatch
  const [isRunning, setIsRunning] = useState(false);
  const [runTime, setRunTime] = useState(0);

  // Accordian
  const [isAccOpen, setIsAccOpen] = useState(false);

  const stopClock = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setRunTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const timeFormat = moment.utc(runTime * 1000).format("HH:mm:ss");

  useEffect(() => {
    const listOfDate = [];
    for (let i = 9; i >= 0; i--) {
      const date = moment().subtract(i, "days").format("DD ddd");
      listOfDate.push(date);
    }
    setDates(listOfDate);
  }, []);

  return (
    <div className="m-5">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <i className="fa-solid fa-clock text-blue-500 text-2xl"></i>
          <div>Time Tracker</div>
        </div>
        <div className="flex gap-2 items-center">
          <i className="fa-solid fa-user text-red-500 text-2xl"></i>
          <div>Sanjai G</div>
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-4 flex gap-5">
        {dates.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center border p-3 rounded-lg bg-gray-100"
          >
            <div className="text-lg font-bold">{item.split(" ")[0]}</div>
            <div className="text-sm text-gray-500">{item.split(" ")[1]}</div>
          </div>
        ))}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          {moment().format("MMMM DD ddd")}
        </button>
      </div>

      {/* Stopwatch Section */}
      <div className="mt-4 flex justify-between items-center rounded-lg shadow-lg p-4">
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

      {/* ACcordian */}
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
              className={`w-3 h-3 transform ${
                isAccOpen ? "rotate-180" : "rotate-0"
              }`}
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
              This is the content inside the accordion. Click the header to
              toggle it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
