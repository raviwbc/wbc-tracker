import React, { useState } from "react"
import './login.css'
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonIcon from '@mui/icons-material/Person';
import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';
export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    return <>
        <div>
            <div className="loginPage">
                <div className="loginTxt">
                    Login
                </div>
                <div className="welcomeTxt">
                    <div>
                        Welcome to  WBC Tracker
                    </div>
                </div>
                <div className="formControlContanier">
                    <div className="usernameContain">
                        <TextField
                            id="Username"
                            label="Enter the user name"
                            variant="outlined"
                            size="small"
                            fullWidth
                        // InputProps={{
                        //     startAdornment: (
                        //         <InputAdornment position="end" sx={{ marginLeft: "auto" }}>
                        //             <IconButton edge="end">
                        //                 <AccountCircle />
                        //             </IconButton>
                        //         </InputAdornment>
                        //     ),
                        // }}
                        />
                    </div>
                    <div className="passwordContain">
                        {/* <TextField id="Password" label="Password" variant="outlined" /> */}

                        <TextField
                            id="Password"
                            label="Enter the password"
                            variant="outlined"
                            size="small"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </div>
                    <div className="submitBtn">
                        <div className="submit">
                            <Button
                                variant="contained"
                                endIcon={<LoginIcon />}
                                fullWidth 
                                // sx={{ maxWidth: "350px", mx: "auto", display: "flex" }} 
                            >
                                LOGIN
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="copyRightTxt">Copyright © 2015,<span style={{color: "#1b004e"}}>  WBC Software Lab</span>. All Rights Reserved.</div>
            </div>
            <div>

            </div>
        </div>

    </>
}
