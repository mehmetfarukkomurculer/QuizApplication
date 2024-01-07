import { createSlice} from "@reduxjs/toolkit";

interface showHeaderState {
    showHeader: boolean;
  }
  
  const initialState: showHeaderState = {
    showHeader: true,
  };

  const headerSlice = createSlice({
    name: "showHeader",
    initialState,
    reducers: {
      setShowHeader(state) {
        state.showHeader = !state.showHeader;
      },
    },
  });
  export const { setShowHeader } = headerSlice.actions;
  export default headerSlice;