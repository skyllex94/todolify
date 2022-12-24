import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

// Not used for now since async fetching the todo list wt state through Main and passing to TodoList
export const getTodosAsync = createAsyncThunk("getTodosAsync", async (id) => {
  // Fetch array of todos from DB and return (through res.send() on the backend) a resp value
  try {
    const resp = await axios.get(`/api/user/${id}`);
    if (resp.status === 200) {
      // If everything okay wt response, return the data from the DB
      return resp.data;
    }
  } catch (err) {
    console.log(err.message);
  }
});

export const addCategoryAsync = createAsyncThunk(
  "addCategoryAsync",
  async (payload) => {
    try {
      const resp = await axios.post(`/api/user/${payload.user_id}`, {
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
  "addTaskAsync",
  // payload => {user_id, category_id, task - meaning the name of the task}
  async (payload) => {
    try {
      const resp = axios.post(
        `/api/user/${payload.user_id}/${payload.category_id}`,
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

export const toggleCompletedTaskAsync = createAsyncThunk(
  "toggleCompletedTaskAsync",
  async (payload) => {
    // payload => {user_id, category_index, done, task_index}
    try {
      const resp = await axios.patch(`/api/user/${payload.user_id}`, {
        category_index: payload.category_index,
        task_index: payload.task_index,
        done: payload.done,
      });

      return await resp;
    } catch (err) {
      alert(err.message);
    }
  }
);

export const updateCategoryAsync = createAsyncThunk(
  "updateCategoryAsync",
  async (payload) => {
    // payload => {user_id, category_index, updatedValue}
    try {
      const resp = await axios.patch(`/api/user/upd-ctry/${payload.user_id}`, {
        category_index: payload.category_index,
        value: payload.updatedValue,
      });

      // Returns an object wt confirmation obj and objInfo
      return await resp;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "updateTaskAsync",
  async (payload) => {
    // payload => {user_id, category_index, task_index, updatedValue}
    try {
      const resp = await axios.patch(`/api/user/upd-task/${payload.user_id}`, {
        category_index: payload.category_index,
        task_index: payload.task_index,
        value: payload.updatedValue,
      });
      // Returns an object wt confirmation obj and objInfo
      return await resp;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "deleteCategoryAsync",
  // payload => {user_id, categoryId}
  async (payload) => {
    try {
      const resp = await axios.delete(
        `/api/user/${payload.user_id}/${payload.categoryId}`
      );

      // Returns category id that was removed from DB
      return await resp;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "deleteTaskAsync",
  // payload => {user_id, category_id, id}
  async (payload) => {
    // console.log("payload:", payload.user_id, payload.category_id, payload.id);

    try {
      const resp = await axios.delete(
        `/api/user/${payload.user_id}/${payload.category_id}/${payload.id}`
      );

      // Returns the id of the task that was deleted
      return await resp;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
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
      // Fething the state wt the data from the DB for current user
      return action.payload;
    });
    // Add category to the user
    builder.addCase(addCategoryAsync.fulfilled, (state, action) => {
      const newCategory = action.payload.data;
      state.push(newCategory);
    });
    // Add task to its category
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      // Returns {newTaskObj, categoryIndex}
      const catIndex = action.payload.data.categoryIndex;
      state[catIndex].tasks.push(action.payload.data.newTaskObj);
    });
    // Toggle completed on a given task
    builder.addCase(toggleCompletedTaskAsync.fulfilled, (state, action) => {
      const categoryIndex = action.payload.data.objInfo.categoryIndex;
      const taskIndex = action.payload.data.objInfo.taskIndex;
      // Value is a boolean, but making sure it's the correct one so it's passed
      const updatedToggle = action.payload.data.objInfo.updatedToggle;
      state[categoryIndex].tasks[taskIndex].done = updatedToggle;
    });
    // Update category with a new value
    builder.addCase(updateCategoryAsync.fulfilled, (state, action) => {
      const categoryIndex = action.payload.data.objInfo.categoryIndex;
      const updatedValue = action.payload.data.objInfo.newValue;
      state[categoryIndex].category = updatedValue;
    });
    // Update a task field with a new value
    builder.addCase(updateTaskAsync.fulfilled, (state, action) => {
      const categoryIndex = action.payload.data.objInfo.categoryIndex;
      const taskIndex = action.payload.data.objInfo.taskIndex;
      const updatedTask = action.payload.data.objInfo.newValue;
      // Update the state at the correct position wt the new task input
      state[categoryIndex].tasks[taskIndex].task = updatedTask;
    });
    // Delete a category
    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      // Find category index and delete it from the state
      const categoryIndex = state.findIndex(
        (curr) => curr._id === action.payload.data
      );
      state.splice(categoryIndex, 1);
    });
    // Delete a task
    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      const categoryIndex = state.findIndex(
        (curr) => curr._id === action.payload.data.category_id
      );
      const taskIndex = state[categoryIndex].tasks.findIndex(
        (curr) => curr._id === action.payload.data.taskToDeleteId
      );
      state[categoryIndex].tasks.splice(taskIndex, 1);
    });
  },
});

export const { addCategory, addTask, toggleTask, deleteTask, addTaskToUI } =
  todosSlice.actions;
export default todosSlice.reducer;
