// src/components/ClockLoader.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./loader.css";

const ClockLoader: React.FC = () => {
  const loading = useSelector((state: any) => state.loaderStatus.loading);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading) {
      setShowLoader(true);
    } else {
      timer = setTimeout(() => setShowLoader(false), 300);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  if (!showLoader) return null;

  return (
    <div className="clock-loader">
      <div className="bg_black_div"></div>
      <div className="clock-face">
        <div className="clock-hand"></div>
        <div className="clock-small-hand"></div>
      </div>
    </div>
  );
};

export default ClockLoader;
