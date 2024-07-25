import { createSlice } from '@reduxjs/toolkit'

export const watchSlice = createSlice({
  name: 'Watch',
  initialState: {
    data: null,
    type: null,
    opened: false
  },
  reducers: {
    open: (state, action) => {
      state.opened = true
      state.data = action.payload
    },
    close: (state) => {
      state.opened = false
      state.data = null
      state.type = null
    },
  },
})

export const { open, close } = watchSlice.actions
export default watchSlice.reducer