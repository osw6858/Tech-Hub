import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./ThemeSlice";

const store = configureStore({
  reducer: { theme: ThemeSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
