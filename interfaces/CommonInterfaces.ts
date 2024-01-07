export interface Question {
  id: string;
  text: string;
  answers: string[];
  correctAnswer: string;
}

export interface QuizResult {
  id: number;
  skippedAnswers: number;
  correctAnswers: number;
  incorrectAnswers: number;
  userAnswers: (string | null)[];
  questions: Question[];
  dateYear: string;
  dateMonth: string;
  dateDay: string;
  dateHour: string;
  dateMinute: string;
}
