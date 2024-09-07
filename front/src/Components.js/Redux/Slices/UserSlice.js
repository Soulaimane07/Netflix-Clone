import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: null,
    profile: null,
    preLogged: false,
    logged: false
  },
  reducers: {
    prelog: (state, action) => {
      state.user = action.payload
      localStorage.setItem('movify-user', JSON.stringify(state.user))
      state.preLogged = true
    },
    login: (state, action) => {
      state.profile = action.payload
      localStorage.setItem('movify-user-profile', JSON.stringify(state.profile))
      state.logged = true
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('movify-user')
      localStorage.removeItem('movify-user-profile')
      state.logged = false
      state.preLogged = false
    },
    signout: (state) => {
      localStorage.removeItem('movify-user-profile')
      state.logged = false
    },
    createAccount: (state, action) => {
      localStorage.setItem('movify-user', JSON.stringify(action.payload))
    },
  },
})

export const { prelog, login, logout, signout, createAccount } = userSlice.actions
export default userSlice.reducer