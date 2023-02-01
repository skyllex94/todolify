import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEventsAsync = createAsyncThunk(
  "getEventsAsync",
  async (user_id) => {
    console.log("user_id:", user_id);
    try {
      const res = await axios.get(`/api/events/${user_id}`);
      console.log("res:", res);
      return res;
    } catch (err) {
      return { err };
    }
  }
);

export const addEventAsync = createAsyncThunk(
  "addEventAsync",
  async (payload) => {
    // payload => {user_id, event_name(string), day(number) month_year(string: "dd/mm/yyyy"), notes}
    try {
      return await axios.post("/api/events/add-event", {
        user_id: payload.user_id,
        event_name: payload.event_name,
        day: payload.day,
        month_year: payload.month_year,
        notes: payload.notes,
      });
    } catch (err) {
      return err.message;
    }
  }
);

export const removeEventAsync = createAsyncThunk(
  "removeEventAsync",
  async (payload) => {
    // payload => {user_id, day(number) month_year(string: "dd/mm/yyyy"), eventIdx}
    try {
      return await axios.delete("/api/events/remove-event", {
        user_id: payload.user_id,
        event_name: payload.event_name,
        day: payload.day,
        month_year: payload.month_year,
        notes: payload.notes,
      });
    } catch (err) {
      return err.message;
    }
  }
);

export const eventsSlice = createSlice({
  name: "events",
  initialState: null,
  extraReducers: (builder) => {
    // Get all events from DB
    builder.addCase(getEventsAsync.fulfilled, (_, action) => {
      const { userTodoList, error } = action.payload.data;
      if (error) {
        alert(error);
        return;
      }
      return userTodoList;
    });

    // Add an event to a specific date
    builder.addCase(addEventAsync.fulfilled, (_, action) => {
      // Make sure you return the correct state
      const { userTodoList, error } = action.payload.data;
      if (error === "undefined") {
        alert(error);
        return;
      }
      return userTodoList;
    });
  },
});

export default eventsSlice.reducer;
