import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, task: "Work on boxes", completed: false },
    { id: 2, task: "Repackage and label", completed: false },
  ],
  reducers: {
    addTask: (state, action) => {
      const todo = {
        id: uuidv4(),
        task: action.payload.task,
        category: action.payload.category,
        completed: false,
      };
      state.push(todo);
    },
    toggleCompleted: (state, action) => {
      // const index = state.findIndex((todo) => todo.id === action.payload.id);
      // state[index].completed = action.payload.completed;

      state.forEach((curr, index) => {
        if (curr.id === action.payload.id) {
          state[index].completed = action.payload.completed;
          console.log(state[index].completed, action);
        }
      });
    },
    deleteTask: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTask, toggleCompleted, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
