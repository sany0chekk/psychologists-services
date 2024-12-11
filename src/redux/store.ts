import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/slice";
import psychologistsReducer from "./psychologists/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    psychologists: psychologistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
