import { useContext, useEffect, useReducer, useState } from "react";
import { MyContext } from "../myContext.tsx";
import React from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest, resetLogout } from "../store/reducers/logout.ts";
import { useLocation, useNavigate } from "react-router-dom";

export const HeaderComp = () => {
  const { theme } = useContext(MyContext);
  const dispatch = useDispatch();
  const location = useLocation();
    const logout = useSelector((state: any) => {
      return state.logoutReducer;
    });
  const [profileSrc, setProfileSrc] = useState<any>("/user-profile.png");
  const [username, setUsername] = useState<any>("WBC Employee");
const navigate = useNavigate();
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

  useEffect(()=>{
    
    console.log(logout)
    if(logout.message === 'Logoff'){
      dispatch(resetLogout())
navigate("/", { replace: true }); 
    }
  }, [logout])




  return (
    <div>
    <div className="pageHeader ms-desk">
      {location.pathname !== "/" && (
        <div className={theme}>
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
          
                        <div className="pl-3 flex items-end gap-1" style={{fontWeight: "600"}}>
                <img src="./icon/logo.svg" alt="" width={28} />
                <div>WBC Timetracker</div>
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
                  <img src="./icon/logout.svg" width={25} height={25} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="pageHeader ms-mobile">
      {location.pathname !== "/" && (
        <div className={theme}>
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <div className="pl-3 flex items-end gap-1" style={{fontWeight: "600"}}>
                <img src="./icon/logo.svg" alt="" width={28} />
                <div>WBC Timetracker</div>
              </div>
            </div>
            
            <div className="flex gap-2 items-center ">
              <div className="flex gap-1 items-center">
                <div className="userWelcome" style={{fontSize: "15px"}} >Hi, <span title={username}> {username || "Guest"} </span>
                </div>
                <div className="subTxt" onClick={handleLogoff}>
                  <img src="./icon/logout-white.svg" width={22} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};


