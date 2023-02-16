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

export const permanentlyDeleteUserAsync = createAsyncThunk(
  "permanentlyDeleteUserAsync",
  async (user_id) => {
    try {
      return await axios.delete(`/api/settings/delete-user`, {
        headers: { Athorization: "***" },
        data: { user_id },
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
    showEventsInTodoList: true,
    startFromSunday: false,
    userConfig: {},
    changeCategoryDoneIcon: false,
    searchForTask: "",
  },
  reducers: {
    openSideMenu: (state, action) => {
      // Per Redux docs, make a copy of the state and return the updated value
      return { ...state, isOpenSideMenu: action.payload };
    },
    openEventsInTodoList: (state, action) => {
      return { ...state, isOpenEventsInTodoList: action.payload };
    },
    showEventsInTodoList: (state, action) => {
      return { ...state, showEventsInTodoList: action.payload };
    },
    startFromSunday: (state, action) => {
      return { ...state, startFromSunday: action.payload };
    },
    updateUserEmail: (state, action) => {
      return { ...state, userEmail: action.payload };
    },
    searchForTask: (state, action) => {
      return { ...state, searchForTask: action.payload };
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

    // // Permanently delete the user and all his todos and data
    // builder.addCase(permanentlyDeleteUserAsync.fulfilled, (state, action) => {
    //   const { permanentlyDeleted, error } = action.payload.data;
    //   if (error) return alert(error);
    //   return { ...state, userConfig };
    // });
  },
});

export const {
  openSideMenu,
  openEventsInTodoList,
  showEventsInTodoList,
  startFromSunday,
  changeCategoryIconToDone,
  searchForTask,
} = settingsSlice.actions;
export default settingsSlice.reducer;
