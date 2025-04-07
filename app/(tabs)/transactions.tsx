import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card, Button } from "react-native-paper";

const transactions = [
  {
    id: "1",
    type: "Approval",
    description: "Approved 500 credits for John Doe",
    date: "2025-04-01",
  },
  {
    id: "2",
    type: "Rejection",
    description: "Rejected 300 credits for Jane Smith",
    date: "2025-04-02",
  },
  {
    id: "3",
    type: "Approval",
    description: "Approved 700 credits for Michael Brown",
    date: "2025-04-03",
  },
];

export default function Transactions() {
  const renderTransaction = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Title title={item.type} subtitle={`Date: ${item.date}`} />
      <Card.Content>
        <Text style={styles.description}>{item.description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() =>
            console.log(`Viewing details for transaction ${item.id}`)
          }
        >
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
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
