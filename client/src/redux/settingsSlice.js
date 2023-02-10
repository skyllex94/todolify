import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserConfigAsync = createAsyncThunk(
  "getUserConfigAsync",
  async (user_id) => {
    try {
      return await axios.get(`/api/settings/${user_id}`);
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const updateUserNameAsync = createAsyncThunk(
  "updateUserNameAsync",
  async (payload) => {
    try {
      return await axios.post(`/api/settings/change-name`, {
        user_id: payload.user_id,
        new_name: payload.new_name,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const updateUserEmailAsync = createAsyncThunk(
  "updateUserEmailAsync",
  async (payload) => {
    try {
      return await axios.post(`/api/settings/change-email`, {
        user_id: payload.user_id,
        new_email: payload.new_email,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const updateUserPassAsync = createAsyncThunk(
  "updateUserPassAsync",
  async (payload) => {
    console.log("payload:", payload);
    try {
      return await axios.post(`/api/settings/change-pass`, {
        user_id: payload.user_id,
        new_pass: payload.new_pass,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isOpenSideMenu: true,
    isOpenEventsInTodoList: true,
    userConfig: {},
  },
  reducers: {
    openSideMenu: (state, action) => {
      // Per Redux docs, make a copy of the state and return the updated value
      return { ...state, isOpenSideMenu: action.payload };
    },
    openEventsInTodoList: (state, action) => {
      return { ...state, isOpenEventsInTodoList: action.payload };
    },
    updateUserEmail: (state, action) => {
      return { ...state, userEmail: action.payload };
    },
  },
  extraReducers: (builder) => {
    // Fetch all user config data
    builder.addCase(getUserConfigAsync.fulfilled, (state, action) => {
      const { userConfig, error } = action.payload.data;
      console.log("userConfig:", userConfig);
      if (error) return alert(error);

      return { ...state, userConfig };
    });

    // Rename user name
    builder.addCase(updateUserNameAsync.fulfilled, (state, action) => {
      const { userConfig, error } = action.payload.data;
      if (error) return alert(error);
      return { ...state, userConfig };
    });

    // Rename user email
    builder.addCase(updateUserEmailAsync.fulfilled, (state, action) => {
      const { userConfig, error } = action.payload.data;
      if (error) return alert(error);
      return { ...state, userConfig };
    });

    // Change user password
    builder.addCase(updateUserPassAsync.fulfilled, (state, action) => {
      const { userConfig, error } = action.payload.data;
      if (error) return alert(error);
      return { ...state, userConfig };
    });
  },
});

export const { openSideMenu, openEventsInTodoList } = settingsSlice.actions;
export default settingsSlice.reducer;
