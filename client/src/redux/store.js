import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import todosSlice from "./todosSlice";
import alertSlice from "./alertSlice";
import eventsSlice from "./eventsSlice";
import settingsSlice from "./settingsSlice";
import goalsSlice from "./goalsSlice";

export default configureStore({
  reducer: {
    todos: todosSlice,
    auth: authSlice,
    alerts: alertSlice,
    events: eventsSlice,
    settings: settingsSlice,
    goals: goalsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
