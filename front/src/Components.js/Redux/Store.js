import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/UserSlice'
import watchReducer from './Slices/WatchSlice'
import profileReducer from './Slices/ProfileSlice'

export const store = configureStore({
  reducer: {
    "user": userReducer,
    "watch": watchReducer,
    "profile": profileReducer,
  },
})