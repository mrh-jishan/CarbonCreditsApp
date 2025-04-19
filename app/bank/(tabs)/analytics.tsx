import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, ProgressBar, Button } from "react-native-paper";

export default function Analytics() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Analytics</Text>

      {/* Carbon Credits Summary */}
      <Card style={styles.card}>
        <Card.Title title="Carbon Credits Earned" />
        <Card.Content>
          <Text style={styles.creditText}>This Month: 120 Credits</Text>
          <Text style={styles.creditText}>Total: 1,450 Credits</Text>
        </Card.Content>
      </Card>

      {/* Commute Data */}
      <Card style={styles.card}>
        <Card.Title title="Commute Data" />
        <Card.Content>
          <Text style={styles.dataText}>Public Transport: 60%</Text>
          <Text style={styles.dataText}>Carpooling: 30%</Text>
          <Text style={styles.dataText}>Work From Home: 10%</Text>
        </Card.Content>
      </Card>

      {/* Progress Tracking */}
      <Card style={styles.card}>
        <Card.Title title="Progress Tracking" />
        <Card.Content>
          <Text style={styles.dataText}>Monthly Goal: 200 Credits</Text>
          <ProgressBar
            progress={0.6}
            color="#4CAF50"
            style={styles.progressBar}
          />
          <Text style={styles.dataText}>60% Completed</Text>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => {}} style={styles.button}>
          View Detailed Report
        </Button>
        <Button mode="outlined" onPress={() => {}} style={styles.button}>
          Export Data
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
  },
  creditText: {
    fontSize: 16,
    marginBottom: 4,
  },
  dataText: {
    fontSize: 14,
    marginBottom: 4,
  },
  progressBar: {
    marginTop: 8,
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
