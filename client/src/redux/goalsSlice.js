import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGoalsAsync = createAsyncThunk(
  "getGoalsAsync",
  async (user_id) => {
    try {
      return await axios.get(`/api/goals/${user_id}`);
    } catch (error) {
      return { error };
    }
  }
);

export const addGoalAsync = createAsyncThunk(
  "addGoalAsync",
  async (payload) => {
    try {
      return await axios.post(`/api/goals/add-goal`, {
        user_id: payload.user_id,
        year_idx: payload.year_idx,
        goal: payload.goal,
      });
    } catch (error) {
      return error.message;
    }
  }
);

export const addYearAsync = createAsyncThunk(
  "addYearAsync",
  async (payload) => {
    try {
      return await axios.post(`/api/goals/add-year`, {
        user_id: payload.user_id,
        new_year: payload.new_year,
        local_data: payload.local_data,
      });
    } catch (error) {
      return error.message;
    }
  }
);

export const toggleGoalAsync = createAsyncThunk(
  "toggleGoalAsync",
  async (payload) => {
    try {
      return await axios.patch(`/api/goals/toggle-goal`, {
        user_id: payload.user_id,
        year_idx: payload.year_idx,
        goal_idx: payload.goal_idx,
        updated_toggle: payload.updated_toggle,
        // local_data: payload.local_data,
      });
    } catch (error) {
      return error.message;
    }
  }
);

export const renameGoalAsync = createAsyncThunk(
  "renameGoalAsync",
  async (payload) => {
    try {
      return await axios.patch(`/api/goals/rename-goal`, {
        user_id: payload.user_id,
        year_idx: payload.year_idx,
        goal_idx: payload.goal_idx,
        renamed_goal: payload.renamed_goal,
        local_data: payload.local_data,
      });
    } catch (error) {
      return error.message;
    }
  }
);

export const removeYearAsync = createAsyncThunk(
  "removeYearAsync",
  async (payload) => {
    console.log("payload:", payload);
    try {
      return await axios.delete(`/api/goals/remove-year`, {
        headers: {
          Authorization: "***",
        },
        data: {
          user_id: payload.user_id,
          year_id: payload.year_id,
          local_data: payload.local_data,
        },
      });
    } catch (error) {
      return error.message;
    }
  }
);

export const removeGoalAsync = createAsyncThunk(
  "removeGoalAsync",
  async (payload) => {
    try {
      return await axios.delete(`/api/goals/remove-goal`, {
        headers: {
          Authorization: "***",
        },
        data: {
          user_id: payload.user_id,
          year_idx: payload.year_idx,
          goal_id: payload.goal_id,
          local_data: payload.local_data,
        },
      });
    } catch (error) {
      return error.message;
    }
  }
);

// export const addEventAsync = createAsyncThunk(
//   "addEventAsync",
//   async (payload) => {
//     // payload => {user_id, event_name(string), day(number) month_year(string: "dd/mm/yyyy"), notes}
//     try {
//       return await axios.post("/api/events/add-event", {
//         user_id: payload.user_id,
//         event_name: payload.event_name,
//         day: payload.day,
//         month_year: payload.month_year,
//         notes: payload.notes,
//       });
//     } catch (err) {
//       return err.message;
//     }
//   }
// );

// export const updateEventAsync = createAsyncThunk(
//   "updateEventAsync",
//   async (payload) => {
//     // payload => { user_id, event_idx, event_name, event_notes, day_idx, month_idx}
//     try {
//       return await axios.patch("/api/events/update-event", {
//         user_id: payload.user_id,
//         event_idx: payload.event_idx,
//         event_name: payload.event_name,
//         event_notes: payload.event_notes,
//         day_idx: payload.day_idx,
//         month_idx: payload.month_idx,
//       });
//     } catch (err) {
//       return err.message;
//     }
//   }
// );

// export const removeEventAsync = createAsyncThunk(
//   "removeEventAsync",
//   async (payload) => {
//     // payload => {user_id, day_idx, month_idx, event_id}
//     try {
//       return await axios.delete("/api/events/remove-event", {
//         headers: {
//           Authorization: "***",
//         },
//         data: {
//           user_id: payload.user_id,
//           day_idx: payload.day_idx,
//           month_idx: payload.month_idx,
//           event_id: payload.event_id,
//         },
//       });
//     } catch (err) {
//       return err.message;
//     }
//   }
// );

export const goalsSlice = createSlice({
  name: "goals",
  initialState: null,
  extraReducers: (builder) => {
    // Get all of the goals from DB
    builder.addCase(getGoalsAsync.fulfilled, (_, action) => {
      const { userData, error } = action.payload.data;
      console.log("userData:", userData);
      if (error === "undefined") {
        alert(error);
        return;
      }
      return userData;
    });

    // Add the new goal to the list
    builder.addCase(addGoalAsync.fulfilled, (_, action) => {
      const { userData, error } = action.payload.data;
      if (error === "undefined") {
        alert(error);
        return;
      }
      return userData;
    });

    // Add a new year
    builder.addCase(addYearAsync.fulfilled, (_, action) => {
      const { userData, error } = action.payload.data;
      if (error) alert(error);

      return userData;
    });

    // Toggle a specific goal
    builder.addCase(toggleGoalAsync.fulfilled, (state, action) => {
      const { userData, error } = action.payload.data;
      console.log("userData:", userData);
      if (error) return { state, error };

      return userData;
    });

    // Remove a specific year
    builder.addCase(removeYearAsync.fulfilled, (_, action) => {
      // You can do it without the builder, but you need it to handle if there's error
      const { userData, error } = action.payload.data;
      if (error) alert(error);
      return userData;
    });

    // Remove a given goal from the year
    builder.addCase(removeGoalAsync.fulfilled, (_, action) => {
      const { userData, error } = action.payload.data;
      if (error) alert(error);
      // Returns the updatedData if successful or same data if not
      return userData;
    });
  },
});

export default goalsSlice.reducer;
