import { createSlice } from '@reduxjs/toolkit';

const loaderAction = createSlice({
  name: 'loader',
  initialState: {
    loading: false,
  },
  reducers: {
    startLoading(state) {
      state.loading = true;
      
    },
    stopLoading(state) {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = loaderAction.actions;
export  const loaderStatus =  loaderAction.reducer;
