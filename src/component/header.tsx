import { useContext } from "react";
import { MyContext } from "../myContext.tsx";
import React from "react";
import './header.css'
import { Button, FormControlLabel, Switch } from "@mui/material";

export const HeaderComp = ()=>{
//    const {text, setText} = useContext(MyContext);

const { theme, user, toggleTheme } = useContext(MyContext);

function mychnages(e:any){  
  alert(e.target.value)
}

    return <div className="pageHeader">

        {/* <div className={theme}>header</div>
        {user}
        as
        <button onClick={toggleTheme}>onClick</button> */}
        <div  className={theme + ' p-3'}>
        <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <div><b>LOGO</b></div>
        </div>
        <div className="flex gap-2 items-center">
        <div>
        <FormControlLabel control={<Switch defaultChecked onChange={toggleTheme} />} label={"Theme"} />
        </div>

          
          <div className="username">Sanjai G</div>
        </div>
      </div>
      </div>
    </div>
}