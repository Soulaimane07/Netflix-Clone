import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BaseUrl } from '../../Variables';
import axios from 'axios';

export const getProfile = createAsyncThunk('profiles/getProfile', async (profileId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BaseUrl}/userprofiles/${profileId}`)
        return response.data
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.message)
    }
})

export const getProfiles = createAsyncThunk('profiles/getProfiles', async (userId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BaseUrl}/users/getProfiles/${userId}`)
        return response.data
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.message)
    }
})

export const profileSlice = createSlice({
    name: 'Profile',
    initialState: {
        profiles: null,     
        profile: null,        
        favSeries: [],
        favMovies: [],
        error: null,       
        loading: false     
    },
    reducers: {
        logProfile: (state, action) => {
            state.profile = action.payload
            state.favSeries = action.payload.favoriteSeries
            state.favMovies = action.payload.favoriteMovies
            localStorage.setItem('movify-user-profile', JSON.stringify(action.payload))
        },
        setProfiles: (state, action) => {
            state.profiles = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false
                state.profile = action.payload
                state.favSeries = action.payload.favoriteSeries
                state.favMovies = action.payload.favoriteMovies
                localStorage.setItem('movify-user-profile', JSON.stringify(action.payload))
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })



            .addCase(getProfiles.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getProfiles.fulfilled, (state, action) => {
                state.loading = false
                state.profiles = action.payload
            })
            .addCase(getProfiles.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { logProfile, setProfiles } = profileSlice.actions
export default profileSlice.reducer
