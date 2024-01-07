import {
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import { Colors } from "../utils/colors";

interface AnswersItemProps {
  onPress: () => void;
  answerText: string;
}

const AnswersItem: React.FC<AnswersItemProps> = ({ onPress, answerText }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.answersText}>{answerText}</Text>
    </Pressable>
  );
};

export default AnswersItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.9,
    backgroundColor: Colors.pressed,
  },
  buttonContainer: {
    backgroundColor: Colors.secondary500,
    padding: 16,
    borderRadius: 16,
    marginVertical: 4,
  },
  answersText: {
    color: Colors.secondary100,
  },
});
