import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyRecaptcha = createAsyncThunk(
  "verifyRecaptchaAsync",
  async (token) => {
    try {
      return await axios.post(
        "http://localhost:3000/api/user/verify_recaptcha",
        { token }
      );
    } catch (err) {
      return console.log(err.message);
    }
  }
);

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
    removeUserId: (state, _) => {
      return { ...state, user_id: null };
    },
  },
});

export const { storeJWT, saveUserId, removeUserId } = authSlice.actions;
export default authSlice.reducer;
