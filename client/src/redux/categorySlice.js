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
      const resp = axios.post(`/user/${payload.user_id}`, {
        categoryId: payload.categoryId,
        task: payload.task,
      });

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
    addTaskToUI: (state, action) => {
      // Action contains -> category name, task name
      const task = {
        task: action.payload.task,
        done: false,
      };
      // Find the index of the category to input task into
      const index = state.findIndex(
        (curr) => curr.id === action.payload.categoryId
      );
      // Push task to the tasks array of correct category
      // state[index].tasks.push(task);
      console.log(current(state));
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
    builder.addCase(addCategoryAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      // state[action.payload.categoryIndex].tasks.push(action.payload.task);

      // state.entities.push(action.payload)
      // Cannot load the state, but able to pass in the payload
      console.log("STATE:", current(state));
      console.log("PAYLOAD:", action.payload);
      console.log(current(state));
      return action.payload;
    });

    // builder.addCase(addTaskAsync.pending, (state, action) => {
    //   console.log(state, action.payload);
    // });
  },
});

export const { addCategory, addTask, toggleTask, deleteTask, addTaskToUI } =
  categorySlice.actions;
export default categorySlice.reducer;
