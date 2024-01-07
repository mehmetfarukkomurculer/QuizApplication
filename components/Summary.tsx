import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import LottieView from "lottie-react-native";
import ResultItems from "./ResultItems";
import { useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "../redux/hooks";
import { setIsQuizStarted } from "../redux/slices/start-quiz-slice";
import { setShowHeader } from "../redux/slices/header-slice";
import { addNewResult } from "../redux/slices/quiz-results-slice";
import { Question } from "../interfaces/CommonInterfaces";
import { QuizResult } from "../interfaces/CommonInterfaces";
import Analysis from "./Analysis";
import { Colors } from "../utils/colors";

interface SummaryProps {
  userAnswers: (string | null)[];
  questions: Question[];
}

const Summary: React.FC<SummaryProps> = ({ userAnswers, questions }) => {
  const animationRef = useRef<LottieView | null>(null);
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  );
  const incorrectAnswers = userAnswers.filter(
    (answer, index) =>
      answer !== questions[index].correctAnswer && answer !== null
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );

  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );

  const incorrectAnswersShare = Math.round(
    (incorrectAnswers.length / userAnswers.length) * 100
  );
  const dispatch = useAppDispatch();

  const currentDate = new Date();
  const newQuizResult: QuizResult = {
    id: Math.round(Math.random() * 10000),
    skippedAnswers: skippedAnswersShare,
    correctAnswers: correctAnswersShare,
    incorrectAnswers: incorrectAnswersShare,
    userAnswers: userAnswers,
    questions: questions,
    dateYear: currentDate.getFullYear().toString(),
    dateMonth: (currentDate.getMonth() + 1).toString(),
    dateDay: currentDate.getDate().toString(),
    dateHour: currentDate.getHours().toString(),
    dateMinute: currentDate.getMinutes().toString(),
  };

  function handleGoBack() {
    dispatch(setIsQuizStarted());
    dispatch(setShowHeader());
  }
  useEffect(() => {
    const playAnimation = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      animationRef.current?.play();
    };

    playAnimation();
    dispatch(addNewResult(newQuizResult));
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 40, alignItems: "center", zIndex: -1 }}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.closeIconButton, styles.pressed]
            : styles.closeIconButton
        }
        onPress={handleGoBack}
      >
        <Ionicons name="md-close-circle" size={32} color="black" />
      </Pressable>
      {correctAnswersShare > 50 ? (
        <LottieView
          ref={(animation) => {
            animationRef.current = animation;
          }}
          autoPlay
          loop
          style={{
            width: 75,
            height: 150,
          }}
          source={require("../assets/lottie/trophy.json")}
        />
      ) : (
        <LottieView
          ref={(animation) => {
            animationRef.current = animation;
          }}
          autoPlay
          loop
          style={{
            width: 75,
            height: 150,
          }}
          source={require("../assets/lottie/sadd.json")}
        />
      )}
      {correctAnswersShare > 50 ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>CONGRATS!</Text>
          <Text style={styles.resultText}>
            You solved {correctAnswers.length} / {userAnswers.length} of
            questions correctly.
          </Text>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>BETTER LUCK NEXT TIME</Text>
          <Text style={styles.resultText}>
            You solved {incorrectAnswers.length} / {userAnswers.length} of
            questions incorrectly.
          </Text>
        </View>
      )}
      <View>
        <Analysis
          skippedAnswersShare={skippedAnswersShare}
          correctAnswersShare={correctAnswersShare}
          incorrectAnswersShare={incorrectAnswersShare}
        />
        <View style={styles.answersListContainer}>
          <FlatList
            data={userAnswers}
            renderItem={(itemData) => (
              <ResultItems
                userAnswer={itemData.item}
                correctAnswer={questions[itemData.index].correctAnswer}
                question={questions[itemData.index].text}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  midText: {
    alignItems: "center",
  },

  answersListContainer: {
    height: "72%",
  },

  resultText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.secondary500,
  },
  resultContainer: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  closeIconButton: {
    position: "absolute",
    right: 10,
  },
  pressed: {
    opacity: 0.25,
  },
});
