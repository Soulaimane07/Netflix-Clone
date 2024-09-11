import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl } from '../../Variables';
import axios from 'axios';

export const getShows = createAsyncThunk('shows', async (page) => {
    try {
        const response = await axios.get(`${BaseUrl}/genres/all?page=${page}&size=2`);
        return response.data; // Return the list of works
    } catch (error) {
        console.error(error);
        throw error;
    }
});

export const getShow = createAsyncThunk('show', async ()=> {
    try {
      const response = await axios.get(`${BaseUrl}/content/random`)
      return response.data
    } catch (error) {
      console.error(error);
      return error.message
    }
})

export const showsSlice = createSlice({
    name: 'Shows',
    initialState: {
        shows: [], // List of all fetched shows
        show: {},  // Random show (for header)
        loading: false,
        loadingshow: false,
    },
    reducers: {
        emptyShows: (state) => {
            state.shows = []; // Clear the shows list
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShows.pending, (state) => {
                state.loading = true;
            })
            .addCase(getShows.fulfilled, (state, action) => {
                state.shows = [...state.shows, ...action.payload]; // Append new data
                state.loading = false;
            })
            .addCase(getShows.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getShow.pending, (state) => {
                state.loadingshow = true;
            })
            .addCase(getShow.fulfilled, (state, action) => {
                state.show = action.payload;
                state.loadingshow = false;
            })
            .addCase(getShow.rejected, (state) => {
                state.loadingshow = false;
            });
    }
});

export const { emptyShows } = showsSlice.actions;
export default showsSlice.reducer;
