import { useContext } from "react";
import { MyContext } from "../myContext.tsx";
import React from "react";
import './header.css'

export const HeaderComp = ()=>{
//    const {text, setText} = useContext(MyContext);

const { theme, user, toggleTheme } = useContext(MyContext);



    return <div className="pageHeader">

        <div className={theme}>header</div>
        {user}
        as
        <button onClick={toggleTheme}>onClick</button>
        <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <i className="fa-solid fa-clock text-blue-500 text-2xl"></i>
          <div>Time Tracker</div>
        </div>
        <div className="flex gap-2 items-center">
          <i className="fa-solid fa-user text-red-500 text-2xl"></i>
          <div>Sanjai G</div>
        </div>
      </div>
    </div>
}