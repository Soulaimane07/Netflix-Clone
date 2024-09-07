import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/UserSlice'
import watchReducer from './Slices/WatchSlice'
import profileReducer from './Slices/ProfileSlice'
import searchReducer from './Slices/SearchSlice'
import viewinghistoryReducer from './Slices/ViewingHistorySlice'
import seriesReducer from './Slices/SeriesSlice'
import moviesReducer from './Slices/MoviesSlice'
import networksReducer from './Slices/NetworksSlice'
import genresReducer from './Slices/GenresSlice'

export const store = configureStore({
  reducer: {
    "user": userReducer,
    "watch": watchReducer,
    "profile": profileReducer,
    "search": searchReducer,
    "viewingHistory": viewinghistoryReducer,
    "series": seriesReducer,
    "movies": moviesReducer,
    "networks": networksReducer,
    "genres": genresReducer,
  },
})