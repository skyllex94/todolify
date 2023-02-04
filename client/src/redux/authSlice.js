import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { jwt: null, user_id: null },
  reducers: {
    storeJWT: (state, action) => {
      // state.jwt = action.payload.jwt;
      return { ...state, jwt: action.payload.jwt };
    },
    saveUserId: (state, action) => {
      // state.user_id = action.payload.user_id;
      return { ...state, user_id: action.payload.user_id };
    },
  },
});

export const { storeJWT, saveUserId } = authSlice.actions;
export default authSlice.reducer;
