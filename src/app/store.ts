import { configureStore } from "@reduxjs/toolkit";

import guardianReducer from "../features/guardianSlice";
import nytimesReducer from "../features/nytimesSlice";
import newsApiReducer from "../features/newsAPISlice";

const store = configureStore({
  reducer: {
    guardian: guardianReducer,
    nytimes: nytimesReducer,
    newsapi: newsApiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
