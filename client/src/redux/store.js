import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import taskSlice from "./taskSlice";

export default configureStore({
  reducer: {
    todos: taskSlice,
    category: categorySlice,
  },
});
