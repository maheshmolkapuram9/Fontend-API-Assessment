import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import postsReducer from './postsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
