import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authToken",
  initialState: { jwt: null, user_id: null, userData: null },
  reducers: {
    storeJWT: (state, action) => {
      // state.jwt = action.payload.jwt;
      return { ...state, jwt: action.payload.jwt };
    },
    saveUserId: (state, action) => {
      // state.user_id = action.payload.user_id;
      return { ...state, user_id: action.payload.user_id };
    },
    saveUserData: (state, action) => {
      return { ...state, userData: action.payload };
    },
  },
});

export const { storeJWT, saveUserId, saveUserData } = authSlice.actions;
export default authSlice.reducer;
