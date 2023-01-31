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
    // payload => {user_id, event_name(string), full_date(string: "dd/mm/yyyy")}
    try {
      return await axios.post("/api/events/add-event", {
        user_id: payload.user_id,
        event_name: payload.event_name,
        full_date: payload.full_date,
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
      if (error) return alert(error);
      return userTodoList.events;
    });

    // Add an event to a specific date
    builder.addCase(addEventAsync.fulfilled, (_, action) => {
      // TODO: Check how you would fetch the events data from the created state
      return action.payload.data;
    });
  },
});

export default eventsSlice.reducer;
