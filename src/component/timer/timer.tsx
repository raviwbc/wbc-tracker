import moment from "moment";
import { useEffect, useState } from "react";

export const RunningTimer = ({startTime}) => {
    const [now, setNow] = useState(moment());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(moment());
        }, 1000);

        return () => clearInterval(interval); // cleanup on unmount
    }, []);
  const duration = moment.duration(now.diff(startTime));
  const formatted = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
    return (
    <div>
      <p>{formatted}</p>
    </div>
  );

}