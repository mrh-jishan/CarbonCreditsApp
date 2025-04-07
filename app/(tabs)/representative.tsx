import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";

export default function Representative() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Representative Dashboard</Text>

      {/* Pending Approvals */}
      <Card style={styles.card}>
        <Card.Title title="Pending Approvals" />
        <Card.Content>
          <Text style={styles.dataText}>Travel Activities Pending: 5</Text>
          <Text style={styles.dataText}>Credits to Approve: 1,200</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => console.log("Viewing Pending Approvals")}
          >
            View Approvals
          </Button>
        </Card.Actions>
      </Card>

      {/* Recent Transactions */}
      <Card style={styles.card}>
        <Card.Title title="Recent Transactions" />
        <Card.Content>
          <Text style={styles.dataText}>
            Transaction #12345: Approved 500 Credits
          </Text>
          <Text style={styles.dataText}>
            Transaction #12346: Rejected 300 Credits
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => console.log("Viewing Transactions")}
          >
            View Transactions
          </Button>
        </Card.Actions>
      </Card>

      {/* Fraud Alerts */}
      <Card style={styles.card}>
        <Card.Title title="Fraud Alerts" />
        <Card.Content>
          <Text style={styles.dataText}>Suspicious Activities: 2</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => console.log("Viewing Fraud Alerts")}
          >
            View Alerts
          </Button>
        </Card.Actions>
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
  dataText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#666",
  },
});
