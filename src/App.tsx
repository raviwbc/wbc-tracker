import React, { useState } from 'react';
// import logo from './logo.svg';
import './custom_styles/font-style.css';

import './App.css';
import { HeaderComp } from './component/header.tsx';
import { MyContext } from './myContext.tsx';
import { MyContextType } from './model/contextApi.ts';
import TimeTrack from './component/timeTrack.tsx';

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState('Guest');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  const contextValue: MyContextType = {
    theme,
    user,
    toggleTheme,
  };

  return (
    <div>
      
      <MyContext.Provider value={contextValue}>
        <div className={theme}>
        <HeaderComp></HeaderComp>
        <TimeTrack />
        </div>
        </MyContext.Provider>
      
    </div>
  );
}

export default App;
