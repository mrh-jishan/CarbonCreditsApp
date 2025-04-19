import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card, Button } from "react-native-paper";

const auditLogs = [
  {
    id: "1",
    activity: "Credit Approval",
    description: "Approved 500 credits for John Doe",
    date: "2025-04-01",
  },
  {
    id: "2",
    activity: "Fraud Investigation",
    description: "Reviewed suspicious activity for Jane Smith",
    date: "2025-04-02",
  },
  {
    id: "3",
    activity: "Manual Entry Validation",
    description: "Validated manual entries for Michael Brown",
    date: "2025-04-03",
  },
];

export default function Audit() {
  const renderAuditLog = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Title title={item.activity} subtitle={`Date: ${item.date}`} />
      <Card.Content>
        <Text style={styles.description}>{item.description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() =>
            console.log(`Viewing details for audit log ${item.id}`)
          }
        >
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Audit Logs</Text>
      <FlatList
        data={auditLogs}
        keyExtractor={(item) => item.id}
        renderItem={renderAuditLog}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
    color: "#666",
  },
});
