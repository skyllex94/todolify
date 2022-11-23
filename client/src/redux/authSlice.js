import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authToken",
  initialState: { jwt: null },
  reducers: {
    storeJWT: (state, action) => {
      state.jwt = action.payload.jwt;
    },
  },
});

export const { storeJWT } = authSlice.actions;
export default authSlice.reducer;
