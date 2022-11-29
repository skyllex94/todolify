import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
import taskSlice from "./taskSlice";

export default configureStore({
  reducer: {
    todos: taskSlice,
    category: categorySlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
