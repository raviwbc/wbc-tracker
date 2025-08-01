import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthData {
    message: "You have successfully logged in.",
    didError: false,
    errorMessage: string | null,
    model: {
        username: string,
        password: string,
        role: string,
        token: string,
        email: string,
        firstName: string,
        lastName: string,
        result: string | null,
        userid: number,
        profileImage:string
    }
}

interface AuthState {
    loading: boolean;
    data: AuthData | null;
    message: string | null;
}

const initialState: AuthState = {
    loading: false,
    data: null,
    message: null
};

export const loginValidation = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRequest: (state, action: PayloadAction<{ userName: string; password: string }>) => {
            state.loading = true;
            state.message = null;
        },
        loginSuccess: (state, action: PayloadAction<AuthData>) => {
            state.loading = false;
            state.data = action.payload;
            state.message = "Login successful!";
            console.log("Login Success:", action.payload);
            localStorage.setItem("accessToken", action.payload.model.token);
            localStorage.setItem("userId", JSON.stringify(action.payload.model.userid))
            localStorage.setItem("currentUser", JSON.stringify(action.payload.model))
            localStorage.setItem("username",action.payload.model.username)
            localStorage.setItem("profileImage", action.payload.model.profileImage)
        },
        loginFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.message = action.payload;
            console.log("Login Failed:", action.payload);
        },
    }
});

// Export reducer and actions
export const loginValidationReducer = loginValidation.reducer;
export const { loginRequest, loginSuccess, loginFailed } = loginValidation.actions;
