import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";

export default function Admin() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

      {/* System Statistics */}
      <Card style={styles.card}>
        <Card.Title title="System Statistics" />
        <Card.Content>
          <Text style={styles.statText}>Total Carbon Credits: 1,000,000</Text>
          <Text style={styles.statText}>Total Users: 5,000</Text>
          <Text style={styles.statText}>Total Trades: 10,000</Text>
        </Card.Content>
      </Card>

      {/* Fraud Detection */}
      <Card style={styles.card}>
        <Card.Title title="Fraud Detection" />
        <Card.Content>
          <Text style={styles.statText}>Suspicious Activities: 5</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => console.log("Viewing Fraud Reports")}
          >
            View Fraud Reports
          </Button>
        </Card.Actions>
      </Card>

      {/* User Management */}
      <Card style={styles.card}>
        <Card.Title title="User Management" />
        <Card.Content>
          <Text style={styles.statText}>Pending Employer Approvals: 10</Text>
          <Text style={styles.statText}>Pending Employee Approvals: 20</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => console.log("Managing Users")}
          >
            Manage Users
          </Button>
        </Card.Actions>
      </Card>

      {/* System Reports */}
      <Card style={styles.card}>
        <Card.Title title="System Reports" />
        <Card.Content>
          <Text style={styles.statText}>
            Generate detailed system-wide reports.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => console.log("Generating Reports")}
          >
            Generate Reports
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
  statText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#666",
  },
});
