import React, { useState } from "react";
import './login.css';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';
import * as Yup from 'yup';


interface LoginFormData {
    username: string;
    password: string;
}

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState<LoginFormData>({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});


    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("This field is required!"),
        password: Yup.string()
            .required("This field is required!"),
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((res: any) => {
            return { ...res, [name]: '' }
        })
        console.log('error', errors);

    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});
            console.log("Form Submitted!", formData);

        } catch (validationError: any) {
            const newErrors: Partial<LoginFormData> = {};
            console.log("validationError !", validationError);

            validationError.inner.forEach((err: any) => {
                newErrors[err.path as keyof LoginFormData] = err.message;
            });
            setErrors(newErrors);
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginPage">
                <div className="loginTxt">Login</div>
                <div className="welcomeTxt">
                    <div>Welcome to <span style={{ color: "#1b004e" }}> WBC Tracker</span></div>
                </div>

                <div className="formControlContainer">
                    <form onSubmit={handleSubmit}>
                        <div className="usernameContain">
                            <TextField
                                id="username"
                                name="username"
                                label="Enter the user name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={formData.username}
                                onChange={handleChange}
                                error={!!errors.username}
                                helperText={errors.username}
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
    );
};
