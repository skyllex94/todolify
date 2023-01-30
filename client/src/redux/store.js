import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import todosSlice from "./todosSlice";

import alertSlice from "./alertSlice";
import eventsSlice from "./eventsSlice";

export default configureStore({
  reducer: {
    todos: todosSlice,
    auth: authSlice,
    alerts: alertSlice,
    events: eventsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
