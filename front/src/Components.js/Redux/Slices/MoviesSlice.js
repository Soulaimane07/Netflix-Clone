import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BaseUrl } from '../../Variables';
import axios from 'axios';

export const getMovies = createAsyncThunk('movies', async ()=> {
    try {
      const response = await axios.get(`${BaseUrl}/movies`)
      return response.data
    } catch (error) {
      console.error(error);
      return error.message
    }
})

export const moviesSlice = createSlice({
    name: 'Movies',
    initialState: {
        data: [],
    },
    reducers: {
        emptyMovies: (state, action) => {
            state.data = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getMovies.pending, (state, action) => {
            })
            .addCase(getMovies.fulfilled, (state, action)=> {
                state.data = action.payload
            })
            .addCase(getMovies.rejected, (state, action)=> {
                state.data = []
            })
    }
})

export const { emptyMovies } = moviesSlice.actions
export default moviesSlice.reducer