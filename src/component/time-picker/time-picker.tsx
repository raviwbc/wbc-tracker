import * as React from "react";
import {
  LocalizationProvider,
  StaticTimePicker,
} from "@mui/x-date-pickers";
import "./time-picker.css";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useState, useRef } from "react";

const TimePk = ({ selectedTime , onTimeSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hasSelected, setHasSelected] = useState(false);

  const acceptedRef = useRef(false); // <-- To track if Accept was clicked

  const handleAccept = (val: any) => {
    if (!val) return;
    acceptedRef.current = true;
    onTimeSelect(val);
  };

  const handleClose = () => {
    debugger
    if (!acceptedRef.current && hasSelected) {
      onTimeSelect(selectedTime); 
    }
    acceptedRef.current = false; 
    setIsOpen(false);
     onTimeSelect(null); 
  };

  //Handle outter click close
  const pickerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!isOpen) return;

    const timeout = setTimeout(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          pickerRef.current &&
          !pickerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      // Cleanup
      cleanup = () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });

    let cleanup = () => {};
    return () => {
      clearTimeout(timeout);
      cleanup();
    };
  }, [isOpen]);


  return (
    <div>
      <div className="timepicker-contain">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <div className="timePicker">
              <StaticTimePicker
                value={selectedTime}
                onAccept={handleAccept}
                onClose={handleClose}
                onChange={(newValue) => {
                  setHasSelected(true);
                }}
                slotProps={{
                  actionBar: {
                    actions: hasSelected ? [ "accept"] : ["cancel"],
                  },
                }}
              />
            </div>
          </ClickAwayListener>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default TimePk;
