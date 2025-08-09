import { useContext, useEffect, useState } from "react";
import { MyContext } from "../myContext.tsx";
import React from "react";
import "./header.css";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../store/reducers/logout.ts";
import { useLocation } from "react-router-dom";

export const HeaderComp = () => {
  const { theme } = useContext(MyContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const [profileSrc, setProfileSrc] = useState<any>("/user-profile.png");
  const [username, setUsername] = useState<any>("WBC Employee");

useEffect(() => {
  const username = localStorage.getItem("username");
  const profileImage = localStorage.getItem("profileImage");

  if (username && profileImage) {
    setUsername(username);
    setProfileSrc(profileImage);
  }
}, []);

  const handleLogoff = () => {
    dispatch(logoutRequest());
  };
  return (
    <div className="pageHeader">
      {location.pathname !== "/" && (
        <div className={theme}>
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <div className="pl-3">
                <b>WBC TIME TRACKER</b>
              </div>
            </div>
            
            <div className="flex gap-2 items-center container-2 ">
              <div className="profileImg ">
                <img src={profileSrc} alt="WBC" className="p-1" />
              </div>
              <div className="flex gap-2 items-center">
                <div className="userWelcome">
                  <span style={{ color: "#1b004e", fontWeight: "bold" }}>
                    Hi,{" "}
                  </span>
                  <span className="username" title={username}>
                    {username || "Guest"}
                  </span>
                  {}
                </div>
                <div className="subTxt" onClick={handleLogoff}>
                  <img src="/icon/logout.svg" width={25} height={25} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


