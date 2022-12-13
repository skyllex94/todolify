import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

// Not used for now since async fetching the todo list wt state through Main and passing to TodoList
export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async (id) => {
    // Fetch array of todos from DB and return (through res.send() on the backend) a resp value
    try {
      const resp = await axios.get(`/user/${id}`);
      if (resp.status === 200) {
        // If everything okay wt response, return the data from the DB
        return resp.data;
      }
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const addCategoryAsync = createAsyncThunk(
  "category/addCategoryAsync",
  async (payload) => {
    try {
      const resp = await axios.post(`/user/${payload.user_id}`, {
        category: payload.category,
      });
      // Returns the new category object from DB
      return await resp;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const addTaskAsync = createAsyncThunk(
  "category/addTaskAsync",
  // payload => {user_id, categoryId, task}
  async (payload) => {
    try {
      const resp = axios.post(
        `/user/${payload.user_id}/${payload.categoryId}`,
        {
          task: payload.task,
        }
      );

      // Returns new task obj wt included id from DB
      return await resp;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "category/deleteCategoryAsync",
  // payload => {user_id, categoryId}
  async (payload) => {
    try {
      const resp = await axios.delete(
        `/user/${payload.user_id}/${payload.categoryId}`
      );

      // Returns category id that was removed from DB
      return await resp;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "category/deleteTaskAsync",
  // payload => {user_id, category_id, id}
  async (payload) => {
    console.log("payload:", payload.user_id, payload.category_id, payload.id);
    try {
      const resp = await axios.delete(
        `/user/${payload.user_id}/${payload.category_id}/${payload.id}`
      );

      // Returns new task obj wt included id from DB
      return await resp;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      const category = { category: action.payload.categoryName };
      state.push(category);
    },
    toggleTask: (state, action) => {
      // Action contains -> categoryId, task.id, task.done
      const categoryIndex = state.findIndex(
        (curr) => curr.id === action.payload.categoryId
      );
      const index = state[categoryIndex].tasks.findIndex(
        (curr) => curr.id === action.payload.id
      );
      state[categoryIndex].tasks[index].done = action.payload.done;
    },
    deleteTask: (state, action) => {
      // Action contains -> categoryId, id
      const categoryIndex = state.findIndex(
        (curr) => curr.id === action.payload.categoryId
      );
      const index = state[categoryIndex].tasks.findIndex(
        (curr) => curr.id === action.payload.id
      );
      state[categoryIndex].tasks.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    // Fetch all of the todo list from the DB and return it to the UI for displaying
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    // Add category and return it to be displayed
    builder.addCase(addCategoryAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    // Add task and return it to be displayed
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      console.log(current(state));
      return action.payload;
    });
    // Delete a category
    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    // Delete a task
    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { addCategory, addTask, toggleTask, deleteTask, addTaskToUI } =
  categorySlice.actions;
export default categorySlice.reducer;
