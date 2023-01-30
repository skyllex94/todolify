import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEventsAsync = createAsyncThunk(
  "getEventsAsync",
  async (user_id) => {
    console.log("payload:", user_id);
    try {
      return await axios.get(`/api/events/${user_id}`);
    } catch (err) {
      return { err };
    }
  }
);

export const addEventAsync = createAsyncThunk(
  "addEventAsync",
  async (payload) => {
    // payload => {user_id, event_name(string), day(number), month_year(string: "mm/yyyy")}
    try {
      return await axios.post("/api/events/add-event", {
        user_id: payload.user_id,
        event_name: payload.event_name,
        day: payload.day,
        month_year: payload.month_year,
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
    // Add an event to a specific date
    builder.addCase(addEventAsync.fulfilled, (_, action) => {
      // TODO: Check how you would fetch the events data from the created state
      return action.payload.data;
    });
  },
});
export const {} = eventsSlice.actions;
export default eventsSlice.reducer;
