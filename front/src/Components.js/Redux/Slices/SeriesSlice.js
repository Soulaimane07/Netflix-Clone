import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BaseUrl } from '../../Variables';
import axios from 'axios';

export const getSeries = createAsyncThunk('series', async ()=> {
    try {
      const response = await axios.get(`${BaseUrl}/genres/series`)
      return response.data
    } catch (error) {
      console.error(error);
      return error.message
    }
})

export const getSerie = createAsyncThunk('serie', async ()=> {
    try {
      const response = await axios.get(`${BaseUrl}/content/serie`)
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
        serie: {},
        loadingSerie: false,
        loading: false
    },
    reducers: {
        emptySeries: (state, action) => {
            state.data = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getSeries.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getSeries.fulfilled, (state, action)=> {
                state.data = action.payload
                state.loading = false
            })
            .addCase(getSeries.rejected, (state, action)=> {
                state.data = []
                state.loading = false
            })


            .addCase(getSerie.pending, (state, action) => {
                state.loadingSerie = true
            })
            .addCase(getSerie.fulfilled, (state, action)=> {
                state.serie = action.payload
                state.loadingSerie = false
            })
            .addCase(getSerie.rejected, (state, action)=> {
                state.data = {}
                state.loadingSerie = false
            })
    }
})

export const { emptySeries } = seriesSlice.actions
export default seriesSlice.reducer