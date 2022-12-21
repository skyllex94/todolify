import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import todosSlice from "./todosSlice";

import alertSlice from "./alertSlice";

export default configureStore({
  reducer: {
    todos: todosSlice,
    auth: authSlice,
    alerts: alertSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
