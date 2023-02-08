import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "currentUserData",
  initialState: null,
  reducers: {
    saveUserData: (_, action) => {
      return action.payload;
    },
  },
});

export const { saveUserData } = dataSlice.actions;
export default dataSlice.reducer;
