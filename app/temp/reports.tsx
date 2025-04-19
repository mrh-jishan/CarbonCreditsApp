import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";

export default function Reports() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Reports</Text>

      {/* Monthly Carbon Footprint Report */}
      <Card style={styles.card}>
        <Card.Title title="Monthly Carbon Footprint" />
        <Card.Content>
          <Text style={styles.reportText}>Total Carbon Credits: 10,000</Text>
          <Text style={styles.reportText}>
            Average Employee Contribution: 500 Credits
          </Text>
          <Text style={styles.reportText}>
            Top Contributor: John Doe (1,200 Credits)
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => console.log("Viewing Monthly Report")}
          >
            View Full Report
          </Button>
        </Card.Actions>
      </Card>

      {/* Yearly Performance Report */}
      <Card style={styles.card}>
        <Card.Title title="Yearly Performance" />
        <Card.Content>
          <Text style={styles.reportText}>Total Credits Earned: 120,000</Text>
          <Text style={styles.reportText}>Total Employees: 50</Text>
          <Text style={styles.reportText}>Credits Traded: 30,000</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => console.log("Viewing Yearly Report")}
          >
            View Full Report
          </Button>
        </Card.Actions>
      </Card>

      {/* Export Data */}
      <Button
        mode="outlined"
        onPress={() => console.log("Exporting Data")}
        style={styles.exportButton}
      >
        Export Data
      </Button>
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
  reportText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#666",
  },
  exportButton: {
    marginTop: 16,
  },
});
