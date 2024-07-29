import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BaseUrl } from '../../Variables';
import axios from 'axios';

export const getProfile = createAsyncThunk('profiles', async (profileId)=> {
    try {
      const response = await axios.get(`${BaseUrl}/userprofiles/${profileId}`)
      return response.data
    } catch (error) {
      console.log(error);
      return error.message
    }
})

export const profileSlice = createSlice({
    name: 'Profile',
    initialState: {
        data: null,
        favSeries: [],
        favMovies: [],
    },
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(getProfile.pending, (state, action) => {
                state.data = true
            })
            .addCase(getProfile.fulfilled, (state, action)=> {
                state.data = action.payload
                state.favSeries = action.payload.favoriteSeries
                state.favMovies = action.payload.favoriteMovies
            })
            .addCase(getProfile.rejected, (state, action)=> {
                state.data = {}
            })
    }
})

export const { login, setProfilee, logout, updateUser } = profileSlice.actions
export default profileSlice.reducer