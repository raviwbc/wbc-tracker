// src/components/ClockLoader.tsx
import React, { useEffect } from 'react';
import './loader.css';
import { useSelector } from 'react-redux';

const ClockLoader = () => {
  const loading = useSelector((state: any) => state.loaderStatus.loading); 
  if (!loading) return null;
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
