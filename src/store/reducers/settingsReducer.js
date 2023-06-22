import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    serverUrl: "",
    wsUrl: '',
  },
  reducers: {
    setServerUrl: (state, action) => {
      state.serverUrl = action.payload;
    },
    setWsurl: (state, action) => {
      state.wsUrl = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setServerUrl, setWsurl } = settingsSlice.actions;

export default settingsSlice.reducer;
