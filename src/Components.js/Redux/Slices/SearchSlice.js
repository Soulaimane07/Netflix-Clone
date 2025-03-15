import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'Search',
  initialState: {
    text: null,
    opened: false,
  },
  reducers: {
    open: (state, action) => {
      state.opened = true
    },
    close: (state, action) => {
      state.opened = false
      state.text = null
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('Disney-user')
      localStorage.removeItem('Disney-user-profile')
      state.logged = false
      state.preLogged = false
    },
    signout: (state) => {
      localStorage.removeItem('Disney-user-profile')
      state.logged = false
    },
    search: (state, action)=> {
      state.text = action.payload
      state.text !== '' && (state.opened = true)
      state.text === '' && (state.opened = false)
    }
  },
})

export const { open, close, search} = searchSlice.actions
export default searchSlice.reducer