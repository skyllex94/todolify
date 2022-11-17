import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const categorySlice = createSlice({
  name: "category",
  initialState: [
    {
      id: uuidv4(),
      category: "Coding",
      tasks: [
        { id: 1, task: "Redux-Thunk", done: false },
        { id: 3, task: "Learning Redux", category: "Coding", done: false },
      ],
    },
    {
      id: uuidv4(),
      category: "Business",
      tasks: [{ id: 2, task: "Label FBA", category: "Business", done: false }],
    },
  ],
  reducers: {
    addCategory: (state, action) => {
      const category = { category: action.payload.categoryName };
      state.push(category);
    },
    addTask: (state, action) => {
      // Action contains -> category name, task object
      const task = { id: uuidv4(), task: action.payload.task, done: false };
      // Find the index of the category to input task into
      const index = state.findIndex(
        (curr) => curr.id === action.payload.categoryId
      );
      // Push task to the tasks array of correct category
      state[index].tasks.push(task);
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

      console.log(state[categoryIndex]);
      return state[categoryIndex].tasks.filter(
        (curr) => curr.id !== action.payload.id
      );
    },
  },
});

export const { addCategory, addTask, toggleTask, deleteTask } =
  categorySlice.actions;
export default categorySlice.reducer;
