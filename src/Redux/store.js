// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const reducers = combineReducers({
  auth: authSlice,

});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
