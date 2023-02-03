import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isOpenSideMenu: true,
    isOpenEventsInTodoList: true,
  },
  reducers: {
    openSideMenu: (state, action) => {
      // Per Redux docs, make a copy of the state and return the updated value
      return { ...state, isOpenSideMenu: action.payload };
    },
    openEventsInTodoList: (state, action) => {
      return { ...state, isOpenEventsInTodoList: action.payload };
    },
  },
});

export const { openSideMenu, openEventsInTodoList } = settingsSlice.actions;
export default settingsSlice.reducer;
