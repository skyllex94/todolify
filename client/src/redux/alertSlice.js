import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alerts",
  initialState: { alert: {} },
  reducers: {
    createAlert: (state, action) => {
      state.alert = {
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    clearAlert: (state, action) => {
      state.alert = {};
    },
  },
  extraReducers: (builder) => {},
});

export const { createAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
