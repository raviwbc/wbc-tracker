// src/components/ClockLoader.tsx
import React, { useEffect } from 'react';
import './loader.css';
import { useSelector } from 'react-redux';

const ClockLoader = () => {
    const loaderState = useSelector((state: any) => state);
  
    useEffect(() => {
      console.log('Loader state', loaderState);
    }, [loaderState]);
  
    // Only render when loading is true
    if (!loaderState.loading) {
      return null;
    }
  
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
