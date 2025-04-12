import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthData {
    token: string;
    user: any;  // Ideally, replace `any` with a proper user type
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
        loginRequest: (state, action: PayloadAction<{ username: string; password: string }>) => {
            state.loading = true;
            state.message = null;
            console.log("Login Request Dispatched:", action.payload);
        },
        loginSuccess: (state, action: PayloadAction<AuthData>) => {
            state.loading = false;
            state.data = action.payload;
            state.message = "Login successful!";
            console.log("Login Success:", action.payload);
            localStorage.setItem("accessToken", action.payload.model.token);
        },
        loginFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.message = action.payload;
            console.log("Login Failed:", action.payload);
        }
    }
});

// Export reducer and actions
export const loginValidationReducer = loginValidation.reducer;
export const { loginRequest, loginSuccess, loginFailed } = loginValidation.actions;
