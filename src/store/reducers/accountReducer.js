import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isLogged: false,
    accountData: null,
    token: "",
  },
  reducers: {
    changeLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLogged, setToken } = accountSlice.actions;

export default accountSlice.reducer;
