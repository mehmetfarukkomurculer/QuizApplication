import { StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import Quiz from "../../components/Quiz";
import { useAppSelector } from "../../redux/hooks";
import StartQuizScreen from "../mini/StartQuizScreen";
import QUESTIONS from "../../data/Questions";
import { useEffect, useState } from "react";
import { Colors } from "../../utils/colors";

interface Question {
  id: string;
  text: string;
  answers: string[];
  correctAnswer: string;
}

const HomeScreen = () => {
  const showHeader = useAppSelector((state) => state.showHeader.showHeader);
  const isQuizStarted = useAppSelector(
    (state) => state.startQuiz.isQuizStarted
  );

  function getRandomTenQuestions(): Question[] {
    const copyQuestions = QUESTIONS.slice();
    const uniqueQuestionIndices = new Set<number>();

    while (uniqueQuestionIndices.size < 10) {
      const randomIndex = Math.floor(Math.random() * copyQuestions.length);
      uniqueQuestionIndices.add(randomIndex);
    }
    const uniqueQuestionsArray: Question[] = Array.from(
      uniqueQuestionIndices
    ).map((index) => copyQuestions[index]);
    return uniqueQuestionsArray;
  }

  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const questions = getRandomTenQuestions();
    setRandomQuestions(questions);
  }, [isQuizStarted]);

  //console.log(randomQuestions);

  let content =
    isQuizStarted === false ? (
      <StartQuizScreen />
    ) : (
      <View style={styles.container}>
        {showHeader && <Header />}
        <Quiz randomQuestions={randomQuestions} />
      </View>
    );
  return <>{content}</>;
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary700,
  },
});
