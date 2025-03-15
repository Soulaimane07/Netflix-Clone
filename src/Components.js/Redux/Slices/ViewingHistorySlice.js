import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BaseUrl } from '../../Variables';
import axios from 'axios';

export const getViewinghistory = createAsyncThunk('viewinghistory', async (profileId)=> {
    try {
      const response = await axios.get(`${BaseUrl}/userviewing/profile/${profileId}`)
      return response.data
    } catch (error) {
      console.error(error);
      return error.message
    }
})

export const viewinghistorySlice = createSlice({
    name: 'Viewinghistory',
    initialState: {
        data: [],
    },
    reducers: {
        emptyViewinghistory: (state, action) => {
            state.data = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getViewinghistory.pending, (state, action) => {
            })
            .addCase(getViewinghistory.fulfilled, (state, action)=> {
                state.data = action.payload
            })
            .addCase(getViewinghistory.rejected, (state, action)=> {
                state.data = []
            })
    }
})

export const { emptyViewinghistory } = viewinghistorySlice.actions
export default viewinghistorySlice.reducer