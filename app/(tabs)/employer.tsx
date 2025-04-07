import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";

export default function Employer() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Employer Dashboard</Text>

      {/* Organization Carbon Credits Summary */}
      <Card style={styles.card}>
        <Card.Title title="Organization Carbon Credits" />
        <Card.Content>
          <Text style={styles.creditText}>Available Credits: 10,000</Text>
          <Text style={styles.creditText}>Total Earned: 50,000</Text>
        </Card.Content>
      </Card>

      {/* Employee Contributions */}
      <Card style={styles.card}>
        <Card.Title title="Employee Contributions" />
        <Card.Content>
          <Text style={styles.dataText}>
            Top Contributor: John Doe (1,200 Credits)
          </Text>
          <Text style={styles.dataText}>Average Contribution: 500 Credits</Text>
          <Text style={styles.dataText}>Total Employees: 50</Text>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => {}} style={styles.button}>
          Manage Employees
        </Button>
        <Button mode="outlined" onPress={() => {}} style={styles.button}>
          Trade Credits
        </Button>
      </View>

      {/* Reports */}
      <Card style={styles.card}>
        <Card.Title title="Reports" />
        <Card.Content>
          <Text style={styles.dataText}>Monthly Carbon Footprint Report</Text>
          <Button mode="text" onPress={() => {}}>
            View Report
          </Button>
        </Card.Content>
      </Card>
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
    color: "#666",
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
