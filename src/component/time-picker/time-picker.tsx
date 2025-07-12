import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import "./time-picker.css";

const TimePk = ({ selectedTime, onTimeSelect, selectedStartTime }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hasSelected, setHasSelected] = useState(false);
  const [tempVal, setTempVal] = useState<Moment | null>(selectedTime ?? null);
  const acceptedRef = useRef(false);

  
  if(selectedStartTime !== ''){
    selectedTime = moment(selectedStartTime, "HH:mm")
  }

  const handleAccept = (val: Moment | null) => {
    if (!val) return;
    acceptedRef.current = true;
    onTimeSelect(val);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (!acceptedRef.current && hasSelected && tempVal) {
      if (!moment(tempVal).isSame(selectedTime)) {
        onTimeSelect(tempVal); 
      } else {
        onTimeSelect(null); 
      }
    }

    acceptedRef.current = false;
  };

  return (
    <div className="timepicker-contain">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className="timePicker">
            <StaticTimePicker
              value={selectedTime}
              onAccept={handleAccept}
              onClose={handleClose}
              onChange={(newValue) => {
                if (newValue) {
                  setHasSelected(true);
                  setTempVal(newValue);
                }
              }}
              minTime={
                selectedStartTime
                  ? moment(selectedStartTime, "HH:mm")
                  : undefined
              }
              slotProps={{
                actionBar: {
                  actions: hasSelected ? ["accept"] : ["cancel"],
                },
              }}
            />
          </div>
        </ClickAwayListener>
      </LocalizationProvider>
    </div>
  );
};

export default TimePk;
