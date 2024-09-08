import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BaseUrl } from '../../Variables';
import axios from 'axios';

export const getMovies = createAsyncThunk('movies', async ()=> {
    try {
      const response = await axios.get(`${BaseUrl}/genres/movies`)
      return response.data
    } catch (error) {
      console.error(error);
      return error.message
    }
})

export const getMovie = createAsyncThunk('movie', async ()=> {
    try {
      const response = await axios.get(`${BaseUrl}/content/movie`)
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
        headermovie: {},
        loadingMovie: false,
        loading: false
    },
    reducers: {
        emptyMovies: (state, action) => {
            state.data = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getMovies.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getMovies.fulfilled, (state, action)=> {
                state.data = action.payload
                state.loading = false
            })
            .addCase(getMovies.rejected, (state, action)=> {
                state.data = []
                state.loading = false
            })


            .addCase(getMovie.pending, (state, action) => {
                state.loadingMovie = true
            })
            .addCase(getMovie.fulfilled, (state, action)=> {
                state.headermovie = action.payload;
                state.loadingMovie = false;
            })
            .addCase(getMovie.rejected, (state, action)=> {
                state.headermovie = {}
                state.loadingMovie = false
            })
    }
})

export const { emptyMovies } = moviesSlice.actions
export default moviesSlice.reducer