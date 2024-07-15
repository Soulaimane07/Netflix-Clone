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
    login: (state, action) => {
      state.user = action.payload.person || action.payload
      localStorage.setItem('Disney-user', JSON.stringify(state.user))
      state.preLogged = true
    },
    setProfilee: (state, action) => {
      state.profile = action.payload
      localStorage.setItem('Disney-user-profile', JSON.stringify(state.profile))
      state.logged = true
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('Disney-user')
      localStorage.removeItem('Disney-user-profile')
      state.logged = false
      state.preLogged = false
    },
  },
})

export const { login, setProfilee, logout, updateUser } = userSlice.actions
export default userSlice.reducer