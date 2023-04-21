import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const syncWtGoogleCalendar = createAsyncThunk(
  "syncWtGoogleCalendar",
  async (payload) => {
    try {
      return await axios.post("/api/events/sync_calendar", {
        auth_code: payload.code,
        user_id: payload.user_id,
      });
    } catch (err) {
      return err.message;
    }
  }
);

export const checkRefreshToken = createAsyncThunk(
  "checkRefreshToken",
  async (user_id) => {
    try {
      return await axios.post("/api/events/check_refresh_token", {
        user_id,
      });
    } catch (err) {
      return err.message;
    }
  }
);

export const getEventsAsync = createAsyncThunk(
  "getEventsAsync",
  async (user_id) => {
    try {
      const res = await axios.get(`/api/events/${user_id}`);
      return res;
    } catch (err) {
      return { err };
    }
  }
);

export const addEventAsync = createAsyncThunk(
  "addEventAsync",
  async (payload) => {
    // payload => {user_id, event_name(string), day(number) month_year(string: "dd/mm/yyyy"), notes
    // event_time, duration (duration of the event), linked_calendars(boolean), google_calendar_color}
    try {
      return await axios.post("/api/events/add-event", {
        user_id: payload.user_id,
        event_name: payload.event_name,
        event_time: payload.event_time,
        duration: payload.duration,
        day: payload.day,
        month_year: payload.month_year,
        notes: payload.notes,
        linked_calendars: payload.linked_calendars,
        google_calendar_color: payload.google_calendar_color,
      });
    } catch (err) {
      return err.message;
    }
  }
);

export const toggleEventAsync = createAsyncThunk(
  "toggleEventAsync",
  async (payload) => {
    // payload => { user_id, event_idx, day_idx, month_idx, updated_toggle}
    try {
      return await axios.patch("/api/events/toggle-event", {
        user_id: payload.user_id,
        event_idx: payload.event_idx,
        day_idx: payload.day_idx,
        month_idx: payload.month_idx,
        updated_toggle: payload.updated_toggle,
      });
    } catch (err) {
      return err.message;
    }
  }
);

export const updateEventAsync = createAsyncThunk(
  "updateEventAsync",
  async (payload) => {
    // payload => { user_id, event_idx, event_name, event_notes, day_idx, month_idx}
    try {
      return await axios.patch("/api/events/update-event", {
        user_id: payload.user_id,
        event_idx: payload.event_idx,
        event_name: payload.event_name,
        event_notes: payload.event_notes,
        day_idx: payload.day_idx,
        month_idx: payload.month_idx,
        google_event_id: payload.google_event_id,
        google_start_date: payload.google_start_date,
        google_end_date: payload.google_end_date,
        linked_calendars: payload.linked_calendars,
      });
    } catch (err) {
      return err.message;
    }
  }
);

export const removeEventAsync = createAsyncThunk(
  "removeEventAsync",
  async (payload) => {
    // payload => {user_id, day_idx, month_idx, event_id, google_event_id}
    try {
      return await axios.delete("/api/events/remove-event", {
        headers: {
          Authorization: "***",
        },
        data: {
          user_id: payload.user_id,
          day_idx: payload.day_idx,
          month_idx: payload.month_idx,
          event_id: payload.event_id,
          google_event_id: payload.google_event_id,
          linked_calendars: payload.linked_calendars,
        },
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

    // Update an event to a specific date
    builder.addCase(updateEventAsync.fulfilled, (_, action) => {
      const { userTodoList, error } = action.payload.data;
      if (error !== undefined) {
        alert(error);
        return;
      }
      return userTodoList;
    });

    // Remove an event from a specific date
    builder.addCase(removeEventAsync.fulfilled, (_, action) => {
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
