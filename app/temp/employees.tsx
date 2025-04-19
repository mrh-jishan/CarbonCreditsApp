import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card, Button } from "react-native-paper";

const employees = [
  { id: "1", name: "John Doe", credits: 1200, role: "Employee" },
  { id: "2", name: "Jane Smith", credits: 950, role: "Employee" },
  { id: "3", name: "Michael Brown", credits: 800, role: "Employee" },
  { id: "4", name: "Emily Davis", credits: 700, role: "Employee" },
];

export default function Employees() {
  const renderEmployee = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Title title={item.name} subtitle={`Role: ${item.role}`} />
      <Card.Content>
        <Text style={styles.creditText}>Credits Earned: {item.credits}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => console.log(`Viewing details for ${item.name}`)}>
          View Details
        </Button>
        <Button
          onPress={() => console.log(`Managing ${item.name}`)}
          mode="outlined"
        >
          Manage
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Employees</Text>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={renderEmployee}
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
  creditText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
