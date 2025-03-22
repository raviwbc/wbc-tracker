import React, { useState } from 'react';
// import logo from './logo.svg';
import './custom_styles/font-style.css';

import './App.css';
import { HeaderComp } from './component/header.tsx';
import { MyContext } from './myContext.tsx';
import { MyContextType } from './model/contextApi.ts';
import TimeTrack from './component/timeTrack.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { CompletedList } from './component/completedTaskList/completedList.tsx';
import Tie from './pages/games/tie.tsx';
import { Login } from './component/login/login.tsx';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';

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
          <BrowserRouter>
          {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav> */}
      <Provider store={store}>
      <MyContext.Provider value={contextValue}>
      <div className={theme}>
      <HeaderComp></HeaderComp>
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<TimeTrack />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<TimeTrack />} />

      </Routes>
      {/* </Router> */}
        
        
        
        
        
        
        </div>
        </MyContext.Provider>
        </Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
