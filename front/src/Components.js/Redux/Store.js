import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/UserSlice'
import watchReducer from './Slices/WatchSlice'

export const store = configureStore({
  reducer: {
    "user": userReducer,
    "watch": watchReducer,
  },
})