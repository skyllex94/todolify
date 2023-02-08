import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Not used for now since async fetching the todo list wt state through Main and passing to TodoList
export const getTodosAsync = createAsyncThunk("getTodosAsync", async (id) => {
  // Fetch array of todos from DB and return (through res.send() on the backend) a resp value
  try {
    const resp = await axios.get(`/api/user/${id}`);
    // If everything okay wt response, return the data from the DB
    if (resp.status === 200) {
      console.log("NEVER", resp.data);
      return resp.data;
    }
  } catch (err) {
    console.log(err.message);
  }
});

export const addDateAsync = createAsyncThunk(
  "addDateAsync",
  // payload => {month_year, day, user_id}
  async (payload) => {
    // Return 'here' from MongoDB
    try {
      return await axios.post(`/api/user/date/${payload.user_id}`, {
        month_year: payload.month_year,
        day: payload.day,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const addCategoryAsync = createAsyncThunk(
  "addCategoryAsync",
  // payload => {user_id, day, month_year, category (the name), activeFrom, activeUntil, timeDuration, daywtData}
  async (payload) => {
    try {
      const resp = await axios.post(`/api/user/${payload.user_id}`, {
        category: payload.category,
        activeFrom: payload.activeFrom,
        activeUntil: payload.activeUntil,
        timeDuration: payload.timeDuration,
        day: payload.day,
        month_year: payload.month_year,
        dayWtData: payload.dayWtData,
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
  // payload => {user_id, category_id, category_index, task (name), day, month_year, dayWtData(boolean)}
  async (payload) => {
    try {
      return await axios.post(
        `/api/user/${payload.user_id}/${payload.category_id}`,
        {
          task: payload.task,
          day: payload.day,
          month_year: payload.month_year,
          dayWtData: payload.dayWtData,
          category_index: payload.category_index,
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const toggleTaskAsync = createAsyncThunk(
  "toggleTaskAsync",
  async (payload) => {
    // payload => {user_id, category_index, day, month_year, done, task_index}

    try {
      return await axios.patch(`/api/user/toggle_task`, {
        user_id: payload.user_id,
        category_index: payload.category_index,
        day: payload.day,
        month_year: payload.month_year,
        task_index: payload.task_index,
        done: payload.done,
      });
    } catch (err) {
      alert(err.message);
    }
  }
);

export const updateCategoryAsync = createAsyncThunk(
  "updateCategoryAsync",
  async (payload) => {
    // payload => {user_id, category_index, day, month_year, dayWtData, updatedValue}
    try {
      // Returns object {userTodoList: theWholeUpdatedDocument, error: IfAny}
      return await axios.patch(`/api/user/upd-ctry/${payload.user_id}`, {
        category_index: payload.category_index,
        day: payload.day,
        month_year: payload.month_year,
        dayWtData: payload.dayWtData,
        new_name: payload.updatedValue,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "updateTaskAsync",
  async (payload) => {
    // payload => {user_id, category_index, day, month_year, task_index, updatedValue}
    console.log("day, month:", payload.day, payload.month_year);
    try {
      // Returns an object wt confirmation obj and objInfo
      return await axios.patch(`/api/user/rename-task/`, {
        user_id: payload.user_id,
        category_index: payload.category_index,
        day: payload.day,
        month_year: payload.month_year,
        task_index: payload.task_index,
        value: payload.updatedValue,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const updateIconAsync = createAsyncThunk(
  "updateIconAsync",
  async (payload) => {
    // payload => {user_id, category_idx, newIconIdx, dayWtData, dayIdx, monthIdx}

    try {
      // Returns an object wt confirmation obj and objInfo
      return await axios.patch(`/api/user/upd-ctry-icon/`, {
        user_id: payload.user_id,
        category_index: payload.category_index,
        iconIdx: payload.iconIdx,
        dayWtData: payload.dayWtData,
        dayIdx: payload.dayIdx,
        monthIdx: payload.monthIdx,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "deleteCategoryAsync",
  // payload => {user_id, categoryId, day, month_year, dayWtData}
  async (payload) => {
    try {
      // Returns category id that was removed from DB
      return await axios.delete(
        `/api/user/${payload.user_id}/${payload.categoryId}`,
        {
          headers: {
            Authorization: "***",
          },
          data: {
            dayWtData: payload.dayWtData,
            day: payload.day,
            month_year: payload.month_year,
          },
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "deleteTaskAsync",
  // payload => {user_id, category_id, id, day, month_year}
  async (payload) => {
    try {
      // Returns the whole updated userTodoList document object
      return await axios.delete(
        `/api/user/${payload.user_id}/${payload.category_id}/${payload.id}`,
        {
          headers: {
            Authorization: "***",
          },
          data: {
            day: payload.day,
            month_year: payload.month_year,
          },
        }
      );
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

    // Add category to a day or to default categories array
    builder.addCase(addCategoryAsync.fulfilled, (state, action) => {
      // Update the whole userTodoList Obj with the updated one
      // Following Redux reducer rule #2: If you change it, replace it.
      return action.payload.data;

      // Alternatively - Push to the state, rather than replacing all of it
      // const newCategory = action.payload.data;
      // const { categoryObj, info } = newCategory;
      // const { dayWtData, monthIdx, dayIdx } = info;
      // console.log("dayIdx:", dayIdx);
      // console.log("monthIdx:", monthIdx);
      // console.log("newCategory:", newCategory.categoryObj);

      // if (dayWtData) {
      //   state.date[monthIdx].days[dayIdx].categories.push(categoryObj);
      // }
      // state.categories.push(categoryObj);
    });

    // Add task to its category
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      // Returns {newTaskObj, categoryIndex}
      // const catIndex = action.payload.data.categoryIndex;
      // state[catIndex].tasks.push(action.payload.data.newTaskObj);

      return action.payload.data;
    });

    builder.addCase(updateIconAsync.fulfilled, (_, action) => {
      console.log(action.payload);
      const { userTodoList, error } = action.payload.data;
      if (error) return console.log(error);

      return userTodoList;
    });

    // Toggle task for a certain category
    builder.addCase(toggleTaskAsync.fulfilled, (state, action) => {
      const { userTodoList, error } = action.payload.data;
      if (error) {
        console.log(error);
        return;
      }
      return userTodoList;
    });

    // Update category's name
    builder.addCase(updateCategoryAsync.fulfilled, (state, action) => {
      // const categoryIndex = action.payload.data.objInfo.categoryIndex;
      // const updatedValue = action.payload.data.objInfo.newValue;
      // state[categoryIndex].category = updatedValue;

      const { userTodoList, error } = action.payload.data;
      if (error) {
        console.log(error);
        return;
      }
      return userTodoList;
    });

    // Rename a task field with a new value
    builder.addCase(updateTaskAsync.fulfilled, (state, action) => {
      // Return the whole updated document
      const { userTodoList, error } = action.payload.data;

      if (error) {
        window.alert(error);
        return;
      }
      return userTodoList;

      // Updating UI State instead of replacing it
      // const categoryIndex = action.payload.data.objInfo.categoryIndex;
      // const taskIndex = action.payload.data.objInfo.taskIndex;
      // const updatedTask = action.payload.data.objInfo.newValue;
      // state[categoryIndex].tasks[taskIndex].task = updatedTask;
    });

    // Delete a category from a day
    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      // Returned the new updated document from todo collection
      const { updatedTodoList } = action.payload.data;
      return updatedTodoList;
      // Alternatively - can we done with finding the field id and splicing it
      // const categoryIndex = state.categories.findIndex(
      //   (curr) => curr._id === action.payload.data
      // );
      // console.log("categoryIndex:", categoryIndex);
      // state.categories.splice(categoryIndex, 1);
    });

    // Delete a task
    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      const updatedDB = action.payload.data;
      const { userTodoList, error } = updatedDB;
      if (error) console.log(error);

      return userTodoList;
      // Initial and alternative way - return task id and splice it
      // const categoryIndex = state.findIndex(
      //   (curr) => curr._id === action.payload.data.category_id
      // );
      // const taskIndex = state[categoryIndex].tasks.findIndex(
      //   (curr) => curr._id === action.payload.data.taskToDeleteId
      // );
      // state[categoryIndex].tasks.splice(taskIndex, 1);
    });
  },
});

export const { addCategory, addTask, toggleTask, deleteTask, addTaskToUI } =
  todosSlice.actions;
export default todosSlice.reducer;
