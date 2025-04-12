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
        userid: number
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
