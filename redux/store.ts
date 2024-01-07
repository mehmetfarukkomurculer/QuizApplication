import { configureStore} from "@reduxjs/toolkit";
import quizSlice from "./slices/quiz-results-slice";
import headerSlice from "./slices/header-slice";
import startQuizSlice from "./slices/start-quiz-slice";
import colorModeSlice from "./slices/color-mode-slice";

const store = configureStore({
  reducer: {
    showHeader: headerSlice.reducer,
    results: quizSlice.reducer,
    startQuiz: startQuizSlice.reducer,
    colorMode: colorModeSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
