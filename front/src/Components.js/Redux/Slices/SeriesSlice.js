import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BaseUrl } from '../../Variables';
import axios from 'axios';

export const getSeries = createAsyncThunk('series', async ()=> {
    try {
      const response = await axios.get(`${BaseUrl}/series`)
      return response.data
    } catch (error) {
      console.error(error);
      return error.message
    }
})

export const seriesSlice = createSlice({
    name: 'Series',
    initialState: {
        data: [],
    },
    reducers: {
        emptySeries: (state, action) => {
            state.data = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getSeries.pending, (state, action) => {
            })
            .addCase(getSeries.fulfilled, (state, action)=> {
                state.data = action.payload
            })
            .addCase(getSeries.rejected, (state, action)=> {
                state.data = []
            })
    }
})

export const { emptySeries } = seriesSlice.actions
export default seriesSlice.reducer