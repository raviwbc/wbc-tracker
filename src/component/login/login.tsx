import React, { useEffect, useState } from "react";
import './login.css';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../store/reducers/auth.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface LoginFormData {
    userName: string;
    password: string;
}

export const Login = () => {
    debugger
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.loginValidationReducer)
    const navigate = useNavigate();
    
    useEffect(() => {
        debugger
        const token = localStorage.getItem('accessToken');
        if(token){
            navigate('/index')
            toast.success('Welcome back!', {duration: 3000});

        }else if(!auth.data && auth.message){
            toast.error(auth.message || "Something went wrong!", {duration: 3000});
            
        }
    }, [auth]);
      
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<LoginFormData>({
        userName: "",
        password: ""
    });
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});


    const validationSchema = Yup.object().shape({
        userName: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});
            console.log("Form Submitted!", formData);
            dispatch(loginRequest(formData));
            console.log('state',auth);
            
            // navigate("/Index");  
            

        } catch (validationError: any) {
            const newErrors: Partial<LoginFormData> = {};
            validationError.inner.forEach((err: any) => {
                newErrors[err.path as keyof LoginFormData] = err.message;
            });
            setErrors(newErrors);
        }
    };

    return (

        <div className="loginContainer">
            <div
                style={{
                    position: "relative",
                    height: "100vh",
                    width: "100vw",
                    overflow: "hidden",
                }}
            >
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        minWidth: "100%",
                        minHeight: "100%",
                        objectFit: "cover",
                        zIndex: -1,
                        transform: "rotate(180deg)",
                    }}
                >
                    <source src="/videos/bg-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

<div className="mobileRoundCrnr1"></div>
<div className="mobileRoundCrnrSub1"></div>

<div className="mobileRoundCrnr2"></div>
<div className="mobileRoundCrnrSub2"></div>
               <div className="flexContainer">
<div className="loginPage">
                    <div className="loginTxt">Login</div>
                    <div className="welcomeTxt">
                        <div>Welcome to <span style={{ color: "#1b004e" }}>WBC Tracker</span></div>
                    </div>

                    <div className="formControlContainer">
                        <form onSubmit={handleSubmit}>
                            <div className="usernameContain">
                                <TextField
                                    id="userName"
                                    name="userName"
                                    label="Enter the user name"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={formData.userName}
                                    onChange={handleChange}
                                    error={!!errors.userName}
                                    helperText={errors.userName}
                                />
                            </div>

                            <div className="passwordContain">
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Enter the password"
                                    variant="outlined"
                                    size="small"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <div className="submitBtn">
                                <Button
                                    variant="contained"
                                    endIcon={<LoginIcon />}
                                    fullWidth
                                    type="submit"
                                >
                                    LOGIN
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="copyRightTxt">
                        Copyright © 2015, <span style={{ color: "#1b004e" }}>WBC Software Lab</span>. All Rights Reserved.
                    </div>
                </div>
               </div>
                
            </div>

        </div>
    );
};
