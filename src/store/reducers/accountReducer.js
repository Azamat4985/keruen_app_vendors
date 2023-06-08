import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    isLogged: false,
    accountData: null,
  },
  reducers: {
    changeLogged: (state, action) => {
      state.isLogged = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { changeLogged } = accountSlice.actions

export default accountSlice.reducer