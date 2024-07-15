import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: null,
    isLogged: false
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      localStorage.setItem('Disney-user', JSON.stringify(state.user))
      state.isLogged = true
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('Disney-user')
      state.isLogged = false
    },
  },
})

export const { login, logout, updateUser } = userSlice.actions
export default userSlice.reducer