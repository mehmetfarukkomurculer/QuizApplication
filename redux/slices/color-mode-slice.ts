import { createSlice } from "@reduxjs/toolkit";

interface colorModeState {
  darkmode: boolean;
}

const initialState: colorModeState = {
  darkmode: true,
};

const colorModeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setColorMode(state) {
      state.darkmode = !state.darkmode;
    },
  },
});
export const { setColorMode } = colorModeSlice.actions;
export default colorModeSlice;
