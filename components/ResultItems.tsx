import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../utils/colors";
interface ResultItemsProps {
  question: string;
  userAnswer: string | null;
  correctAnswer: string;
}

const ResultItems: React.FC<ResultItemsProps> = ({
  userAnswer,
  correctAnswer,
  question,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
      </View>
      <View style={styles.answersContainer}>
        <View>
          <Text style={styles.answersText}>Your Answer: {userAnswer}</Text>
          <Text style={styles.answersText}>
            Correct Answer: {correctAnswer}
          </Text>
        </View>
        {userAnswer === correctAnswer ? (
          <Ionicons name="md-checkmark-circle" color="green" size={32} />
        ) : (
          <Ionicons name="md-close-circle" size={32} color="red" />
        )}
      </View>
    </View>
  );
};

export default ResultItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: Colors.secondary100,
    margin: 4,
    padding: 8,
    borderRadius: 16,
  },
  questionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.pressed,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.pressed,
  },
  answersText: {
    fontSize: 12,
  },
  answersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
