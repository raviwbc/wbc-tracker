import React, { useState ,useEffect} from 'react';
// import logo from './logo.svg';
import './custom_styles/font-style.css';


import './App.css';
import { HeaderComp } from './component/header.tsx';
import { MyContext } from './myContext.tsx';
import { MyContextType } from './model/contextApi.ts';
import TimeTrack from './component/timeTrack.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Login } from './component/login/login.tsx';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ClockLoader from './component/completedTaskList/loader/loader.tsx';
import { TimePicker } from '@mui/x-date-pickers';
import TimePk from './component/time-picker/time-picker.tsx';
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
    
      <ClockLoader />
      <Toaster position="top-center" reverseOrder={false}  toastOptions={{
    // Default style
    
    style: {
      background: '#fff',
      color: '#fffff',
      fontSize: '15px',
      padding: '15px'
    },
    // Customize specific types
    success: {
      icon: <img src="/toater-succes.png" alt="success" width={24} height={24} />,
      style: {
        background: 'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(176 255 129) 50%, rgb(255 255 255) 100%)',
        color: 'black',
        border: '1px solid 1px solid #158015',
        boxShadow: '0 0 10px 2px rgba(0, 0, 0, 0.2)'
      },
    },
    error: {
      icon: <img src="/toaster-error.png" alt="success" width={24} height={24} />,
      style: {
        background: 'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgb(255 157 157) 50%, rgb(255 215 211) 100%)',
        color: '#fffff',
        border: '1px solid rgb(249 30 30 / 52%)',
        boxShadow: '0 0 10px 2px rgba(0, 0, 0, 0.2)'
      },
    },
  }} />
  
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Index" element={<TimeTrack />}/>
        <Route path="/picker" element={<TimePk />}/>
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
