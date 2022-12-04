import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Not used for now since async fetching the todo list wt state through Main and passing to TodoList
export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async (id) => {
    const resp = await axios.get(`/user/${id}`);
    if (resp.ok) {
      const todos = await resp.json();
      return { todos };
    }
  }
);

export const addCategoryAsync = createAsyncThunk(
  "category/addCategoryAsync",
  async (payload) => {
    try {
      await axios.post(`/user/${payload.user_id}`, {
        category: payload.category,
      });
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

      // const resp = await fetch(`/user/${payload.user_id}`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     categoryId: payload.categoryId,
      //     task: payload.task,
      //   }),
      // });

      console.log("tasky:", resp);

      return await resp;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: ["hiiiii"],
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
    // builder.addCase(addCategoryAsync.fulfilled, (state, action) => {
    //   console.log(...state, action);
    // });
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      // state.entities.push(action.payload)
      // console.log("STATE:", current(state));
      // console.log("PAYLOAD:", action.payload);
    });

    // builder.addCase(addTaskAsync.pending, (state, action) => {
    //   console.log(state, action.payload);
    // });
  },
});

export const { addCategory, addTask, toggleTask, deleteTask, addTaskToUI } =
  categorySlice.actions;
export default categorySlice.reducer;
