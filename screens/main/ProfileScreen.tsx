import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import ResultItems from "../../components/ResultItems";
import Analysis from "../../components/Analysis";
import { Colors } from "../../utils/colors";


function ProfileScreen() {
  const results = useAppSelector((state) => state.results.results);
  const [expandedArray, setExpandedArray] = useState(
    Array(results.length).fill(false)
  );

  const toggleExpand = (index: number) => {
    const newExpandedArray = [...expandedArray];
    newExpandedArray[index] = !newExpandedArray[index];
    setExpandedArray(newExpandedArray);
  };

  return (
    <View style={styles.container}>
      {results.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyResultText}>
            No quiz has been solved yet.
          </Text>
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <FlatList
            data={results}
            renderItem={(itemData) => (
              <View style={styles.resultContainer}>
                <Pressable onPress={() => toggleExpand(itemData.index)}>
                  <Analysis
                    correctAnswersShare={itemData.item.correctAnswers}
                    skippedAnswersShare={itemData.item.skippedAnswers}
                    incorrectAnswersShare={itemData.item.incorrectAnswers}
                  />
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                      {itemData.item.dateDay}/{itemData.item.dateMonth}/
                      {itemData.item.dateYear} - {itemData.item.dateHour}:
                      {itemData.item.dateMinute}
                    </Text>
                  </View>
                </Pressable>
                {expandedArray[itemData.index] && (
                  <FlatList
                    data={itemData.item.questions}
                    keyExtractor={(item) => item.id}
                    renderItem={(itemData2) => (
                      <ResultItems
                        userAnswer={itemData.item.userAnswers[itemData2.index]}
                        correctAnswer={itemData2.item.correctAnswer}
                        question={itemData2.item.text}
                      />
                    )}
                    showsVerticalScrollIndicator={false}
                  />
                )}
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary700,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyResultText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.secondary500,
  },
  resultsContainer: {
    backgroundColor: Colors.primary700,
    flex: 1,
    padding: 16,
  },
  resultContainer: {
    backgroundColor: Colors.secondary500,
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
  },
  analysisContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  dateContainer: {
    alignItems: "flex-end",
  },
  analysisText: {
    color: Colors.secondary100,
  },
  dateText: {
    fontSize: 20,
    color: Colors.secondary100,
    fontWeight: "600",
  },
});
