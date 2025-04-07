import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-paper";

const logs = [
  {
    id: "1",
    event: "User Login",
    description: "John Doe logged in",
    date: "2025-04-01",
  },
  {
    id: "2",
    event: "Credit Purchase",
    description: "Jane Smith purchased 500 credits",
    date: "2025-04-02",
  },
  {
    id: "3",
    event: "Fraud Alert",
    description: "Suspicious activity detected for Michael Brown",
    date: "2025-04-03",
  },
  {
    id: "4",
    event: "Credit Trade",
    description: "EcoSolutions traded 300 credits",
    date: "2025-04-04",
  },
];

export default function Logs() {
  const renderLog = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Title title={item.event} subtitle={`Date: ${item.date}`} />
      <Card.Content>
        <Text style={styles.description}>{item.description}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>System Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={renderLog}
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
