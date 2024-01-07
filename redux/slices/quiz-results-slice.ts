import { QuizResult } from "../../interfaces/CommonInterfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizResultsState {
    results: QuizResult[];
  }
  
  const quizResultsInitialState: QuizResultsState = {
    results: [],
  };
  
  const quizSlice = createSlice({
    name: "quizResult",
    initialState: quizResultsInitialState,
    reducers: {
      addNewResult: (state, action: PayloadAction<QuizResult>) => {
        state.results.push(action.payload);
      },
    },
  });
  
  
  export const { addNewResult } = quizSlice.actions;
  export default quizSlice;