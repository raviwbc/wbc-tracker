import * as React from "react";
import { LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import "./time-picker.css";
import dayjs, { Dayjs } from "dayjs";
import ClickAwayListener from '@mui/material/ClickAwayListener';


function TimePk() {
  const [pickervalue, setPickervalue] = React.useState<Dayjs | null>(
    dayjs().hour(12).minute(0)
  );
  const [isOpen, setIsOpen] = React.useState(false);
  
//   Invoke when user click ok in time picker
  const handleAccept = (val:any) => {
    setPickervalue(val);
    setIsOpen(!val);
    console.log(pickervalue);
  };
  //invoke when user clicks cancel in time picker
   const handleCancel = () => {
    setPickervalue(pickervalue); // Reset temporary value
    setIsOpen(false);
    console.log('User cancelled selection');
  };
  

//Handle outter click close
 const pickerRef = React.useRef<HTMLDivElement>(null);
React.useEffect(() => {
  if (!isOpen) return;

  const timeout = setTimeout(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    cleanup = () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  let cleanup = () => {};

  return () => {
    clearTimeout(timeout);
    cleanup();
  };
}, [isOpen]);

  return (
    <div className="timepicker-contain">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Button
          variant="contained"
          type="submit"
          onClick={() => setIsOpen(!isOpen)}
        >
          Click Me
        </Button>
        <div className="">
          {isOpen && (
            <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <div className="timePicker">
              <StaticTimePicker
                defaultValue={pickervalue}
                onAccept={handleAccept} // triggered on OK
                onClose={handleCancel} // Called on both Cancel and OK (after Accept)
                onChange={(newValue) => setPickervalue(pickervalue)} // optional for live update
              />
            </div>
            </ClickAwayListener>
          )}
        </div>
      </LocalizationProvider>
    </div>
  );
}
export default TimePk;
