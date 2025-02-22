import { useContext, useEffect } from "react";
import { MyContext } from "../myContext.tsx";
import React from "react";
import './header.css'
import { Button, FormControlLabel, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementAsync } from "../store/reducers/counter.ts";
import { fetchPostsRequest } from "../store/reducers/titleList.ts";
import { ProjectListRequest } from "../store/reducers/timeTracker.ts";

export const HeaderComp = ()=>{
const { theme, user, toggleTheme } = useContext(MyContext);
const dispatch = useDispatch()
const count= useSelector((state:any) => {
  console.log(state)
  return state.counterReducer.count  
})
const projectList = useSelector((state:any) => {
  console.log(state)
  return state.trackerReducer.data
})

useEffect(()=>{
  console.log(projectList)
},[projectList])

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
          <div><b>LOGO {count}</b></div>
        </div>
        <div className="flex gap-2 items-center">
          {/* <div>
            <button onClick={()=> dispatch(increment())}>+ &nbsp;</button>
            <button onClick={()=> dispatch(decrement())}>- &nbsp;</button>
            <button onClick={()=> dispatch(incrementAsync())}> + &nbsp; Async</button>
            <button onClick={()=> dispatch(fetchPostsRequest())} > api call</button>
            <button onClick={()=> dispatch(ProjectListRequest()) }> call project List </button>
          </div> */}
        <div>
        <FormControlLabel control={<Switch defaultChecked onChange={toggleTheme} />} label={"Theme"} />
        </div>

          
          <div className="username">Sanjai G</div>
        </div>
      </div>
      </div>
    </div>
}