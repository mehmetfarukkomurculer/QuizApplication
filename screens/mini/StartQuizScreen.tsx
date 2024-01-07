import { Pressable, Text, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useAppDispatch } from "../../redux/hooks";
import { setIsQuizStarted } from "../../redux/slices/start-quiz-slice";
import { Colors } from "../../utils/colors";
const StartQuizScreen = () => {
  
  const dispatch = useAppDispatch();

function handleStartQuiz(){
    dispatch(setIsQuizStarted());
}

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        source={require("../../assets/lottie/quiz.json")}
        style={styles.lottieStyles}
      />
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.pressableContainer, styles.pressed]
            : styles.pressableContainer
        }
        onPress={handleStartQuiz}
      >
        <Text style={styles.startText}>START QUIZ</Text>
      </Pressable>
    </View>
  );
};

export default StartQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary700,
  },
  lottieStyles: {
    width: 100,
    height: 200,
  },
  pressableContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary500,
    padding: 16,
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: Colors.pressed,
  },
  startText: {
    fontSize: 36,
    color: Colors.primary700,
  },
});
