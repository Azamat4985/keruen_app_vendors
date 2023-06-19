import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    serverUrl: "",
  },
  reducers: {
    setServerUrl: (state, action) => {
      state.serverUrl = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setServerUrl } = settingsSlice.actions;

export default settingsSlice.reducer;
