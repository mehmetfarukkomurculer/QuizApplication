import { Text, View, FlatList, StyleSheet } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import AnswersItem from "./AnswersItem";
import QuestionTimer from "./QuestionTimer";
import Summary from "./Summary";
import { useAppDispatch } from "../redux/hooks";
import { setShowHeader } from "../redux/slices/header-slice";
import { Colors } from "../utils/colors";

interface Question {
  id: string;
  text: string;
  answers: string[];
  correctAnswer: string;
}

interface QuizProps {
  randomQuestions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ randomQuestions }) => {
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

  const dispatch = useAppDispatch();
  const activeQuestionIndex: number = userAnswers.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer: string | null) {
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  const quizIsComplete = activeQuestionIndex === randomQuestions.length;

  useEffect(() => {
    if (quizIsComplete) {
      dispatch(setShowHeader());
    }
  }, [dispatch, quizIsComplete]);
  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} questions={randomQuestions} />;
  }

  return (
    <View style={styles.questionContainer}>
      <QuestionTimer
        key={activeQuestionIndex}
        timeout={20000}
        onTimeout={handleSkipAnswer}
      />
      <Text style={styles.questionText}>
        {randomQuestions[activeQuestionIndex].text}
      </Text>
      <FlatList
        data={randomQuestions[activeQuestionIndex].answers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <AnswersItem
            onPress={() => handleSelectAnswer(item)}
            answerText={item}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  questionContainer: {
    flex: 1,
    backgroundColor: Colors.secondary100,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 8,
  },
});
