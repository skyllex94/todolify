import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import todosSlice from "./todosSlice";
import alertSlice from "./alertSlice";
import eventsSlice from "./eventsSlice";
import settingsSlice from "./settingsSlice";
import goalsSlice from "./goalsSlice";
import dataSlice from "./dataSlice";

export default configureStore({
  reducer: {
    todos: todosSlice,
    auth: authSlice,
    alerts: alertSlice,
    events: eventsSlice,
    settings: settingsSlice,
    goals: goalsSlice,
    data: dataSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
