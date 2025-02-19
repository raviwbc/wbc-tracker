import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Rh } from './component/file.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img  className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sanjai Santhosh !!
        </a>
        
  
    <div className="font-bold text-green-500">
      Tailwind is Working! ✅
    </div>
  

        <Rh></Rh>
      </header>
    </div>
  );
}

export default App;
