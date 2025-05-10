import { useContext, useEffect, useState } from "react";
import { MyContext } from "../myContext.tsx";
import React from "react";
import './header.css'
import { Button, FormControlLabel, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { decrement, increment, incrementAsync } from "../store/reducers/counter.ts";
import { fetchPostsRequest } from "../store/reducers/titleList.ts";
import { ProjectListRequest } from "../store/reducers/timeTracker.ts";
import { logoutRequest } from "../store/reducers/logout.ts";
import ClockLoader from "./completedTaskList/loader/loader.tsx";
import { useLocation } from "react-router-dom";

export const HeaderComp = () => {
  const { theme, user, toggleTheme } = useContext(MyContext);
  const dispatch = useDispatch()
  const location = useLocation();
  const logoff = useSelector((state: any) => state.logoutReducer)
  const [profileSrc, setProfileSrc] = useState<any>('/user-profile.jpg')
  const [username, setUsername] = useState<any>('WBC Employee')

  const projectList = useSelector((state: any) => {

    return state.trackerReducer.data
  })

  useEffect(() => {
    // if (auth.data?.model) {
    //   console.log("Hi am Header");
    //   setProfileSrc(auth.data?.model.profileImage)
    //   setUsername(auth.data?.model.username)
    // }
    if(localStorage.getItem('username') && localStorage.getItem('profileImage')){
      setUsername(localStorage.getItem('username'))
      setProfileSrc(localStorage.getItem('profileImage'))

    }
    console.log('location',location);
    

  })


  const handleLogoff = () => {
    console.log('Log Off!');

    dispatch(logoutRequest());
  }
  return (<div className="pageHeader">

    {/* <div className={theme}>header</div>
        {user}
        as
        <button onClick={toggleTheme}>onClick</button> */}
    {/* {loading && <ClockLoader />}
           */}
    {/* <ClockLoader /> */}

    {location.pathname != '/' && (<div className={theme}>
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <div className="pl-3"><b>TIME TRACKER</b></div>
        </div>
        <div className="flex gap-2 items-center container-2 ">
          <div className="profileImg ">
            <img src={profileSrc} alt="WBC" />
          </div>
          <div className="userDetails">
            <div className="userWelcome">
              <span style={{ color: '#1b004e', fontWeight: 'bold' }}>Hello </span>
              <span className="username" title={username}>{username || 'Guest'}</span>{}
            </div>
            <div className="subTxt" onClick={handleLogoff}>Log Off</div>
          </div>
        </div>
      </div>
    </div>)}
  </div>)
}