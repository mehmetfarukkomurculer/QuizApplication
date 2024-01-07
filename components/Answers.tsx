import { FlatList } from "react-native";
import AnswersItem from "./AnswersItem";
import { useRef } from "react";

interface AnswersProps {
  answers: string[];
  selectedAnswer: string |null;
  answerState: string;
  onSelect: (selectedAnswer: string) => void;
}

const Answers: React.FC<AnswersProps> = ({
  answers,
  onSelect
}) => {
  const shuffledAnswersRef = useRef<string[]>([]);
  if (!shuffledAnswersRef.current) {
    shuffledAnswersRef.current = [...answers];
    shuffledAnswersRef.current.sort(() => Math.random() - 0.5);
  }
  
  return (
    <FlatList
      data={shuffledAnswersRef.current}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <AnswersItem
          onPress={() => onSelect(item)}
          answerText={item}
        />
      )}
      scrollEnabled={false}
    />
  );
};

export default Answers;
