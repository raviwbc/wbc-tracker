import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { HeaderComp } from './component/file.tsx';
import { MyContext } from './myContext.tsx';

function App() {
  const [theme, setTheme] = useState('light');
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
        </div>
        </MyContext.Provider>
      
    </div>
  );
}

export default App;
