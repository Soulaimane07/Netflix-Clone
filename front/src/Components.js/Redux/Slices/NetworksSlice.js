import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BaseUrl } from '../../Variables';
import axios from 'axios';

export const getNetworks = createAsyncThunk('networks', async ()=> {
    try {
      const response = await axios.get(`${BaseUrl}/networks`)
      return response.data
    } catch (error) {
      console.error(error);
      return error.message
    }
})

export const networksSlice = createSlice({
    name: 'Networks',
    initialState: {
        data: [],
        loading: false
    },
    reducers: {
        emptyNetworks: (state, action) => {
            state.data = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getNetworks.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getNetworks.fulfilled, (state, action)=> {
                state.loading = false
                state.data = action.payload
            })
            .addCase(getNetworks.rejected, (state, action)=> {
                state.loading = false
                state.data = []
            })
    }
})

export const { emptyNetworks } = networksSlice.actions
export default networksSlice.reducer