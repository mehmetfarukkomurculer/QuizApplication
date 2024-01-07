import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";

interface AnalysisProps {
    skippedAnswersShare: number;
    correctAnswersShare: number;
    incorrectAnswersShare: number;
}

const Analysis: React.FC<AnalysisProps> = ({skippedAnswersShare, correctAnswersShare, incorrectAnswersShare}) => {
  return (
    <View style={styles.shares}>
      <View style={styles.analysis}>
        <Text style={styles.analysisText}>Skipped</Text>
        <Text style={styles.analysisText}>{skippedAnswersShare}%</Text>
      </View>
      <View style={styles.analysis}>
        <Text style={styles.analysisText}>Correct</Text>
        <Text style={styles.analysisText}>{correctAnswersShare}%</Text>
      </View>
      <View style={styles.analysis}>
        <Text style={styles.analysisText}>Wrong</Text>
        <Text style={styles.analysisText}> {incorrectAnswersShare}%</Text>
      </View>
    </View>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  shares: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginVertical: 4,
  },
  analysis: {
    alignItems: "center",
    backgroundColor: Colors.primary700,
    padding: 8,
    borderRadius: 8,
  },
  analysisText: {
    color: Colors.secondary100,
  },
});
