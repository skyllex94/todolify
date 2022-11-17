import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const taskSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, task: "Redux-Thunk", category: "Coding", completed: false },
    { id: 2, task: "Label Packages", category: "Business", completed: false },
    { id: 3, task: "Learning Redux", category: "Coding", completed: false },
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
    toggleTask: (state, action) => {
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

export const { addTask, toggleTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
