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

export const logoutValidation = createSlice({
    name: "logout",
    initialState,
    reducers: {
        logoutRequest: (state) => {
            state.loading = true;
            state.message = null;
        },
        logoutsuccess: (state, action: PayloadAction<AuthData>) => {
            state.loading = false;
            state.data = action.payload;
        },
        logoutFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.message = action.payload;
            console.log("Login Failed:", action.payload);
        }
    }
});

// Export reducer and actions
export const logoutReducer = logoutValidation.reducer;
export const { logoutRequest, logoutsuccess, logoutFailed } = logoutValidation.actions;
