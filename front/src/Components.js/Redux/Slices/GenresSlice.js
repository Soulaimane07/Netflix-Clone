import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BaseUrl } from '../../Variables';
import axios from 'axios';

export const getGenres = createAsyncThunk('genres', async ()=> {
    try {
      const response = await axios.get(`${BaseUrl}/gendres`)
      return response.data
    } catch (error) {
      console.error(error);
      return error.message
    }
})

export const genresSlice = createSlice({
    name: 'Genres',
    initialState: {
        data: [],
        loading: false
    },
    reducers: {
        emptyGenres: (state, action) => {
            state.data = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getGenres.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getGenres.fulfilled, (state, action)=> {
                state.loading = false
                state.data = action.payload
            })
            .addCase(getGenres.rejected, (state, action)=> {
                state.loading = false
                state.data = []
            })
    }
})

export const { emptyGenres } = genresSlice.actions
export default genresSlice.reducer