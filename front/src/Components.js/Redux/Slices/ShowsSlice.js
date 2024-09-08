import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BaseUrl } from '../../Variables';
import axios from 'axios';

export const getShows = createAsyncThunk('shows', async ()=> {
    try {
      const response = await axios.get(`${BaseUrl}/genres/all`)
      return response.data
    } catch (error) {
      console.error(error);
      return error.message
    }
})

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
        shows: [],
        show: {},
        loading: false,
        loadingshow: false,
    },
    reducers: {
        emptyShows: (state, action) => {
            state.data = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getShows.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getShows.fulfilled, (state, action)=> {
                state.shows = action.payload
                state.loading = false
            })
            .addCase(getShows.rejected, (state, action)=> {
                state.shows = []
                state.loading = false
            })

            
            .addCase(getShow.pending, (state, action) => {
                state.loadingshow = true
            })
            .addCase(getShow.fulfilled, (state, action)=> {
                state.show = action.payload
                state.loadingshow = false
            })
            .addCase(getShow.rejected, (state, action)=> {
                state.show = {}
                state.loadingshow = false
            })
    }
})

export const { emptyShows } = showsSlice.actions
export default showsSlice.reducer