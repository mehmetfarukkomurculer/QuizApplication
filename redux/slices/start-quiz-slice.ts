import { createSlice} from "@reduxjs/toolkit";

interface showHeaderState {
  isQuizStarted: boolean;
}

const initialState: showHeaderState = {
  isQuizStarted: false,
};

const startQuizSlice = createSlice({
  name: "startQuiz",
  initialState,
  reducers: {
    setIsQuizStarted(state) {
      state.isQuizStarted = !state.isQuizStarted;
    },
  },
});


export const { setIsQuizStarted } = startQuizSlice.actions;
export default startQuizSlice;
