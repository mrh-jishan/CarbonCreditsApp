import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";

export default function Settings() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Admin Settings</Text>

      {/* Manage Users */}
      <Card style={styles.card}>
        <Card.Title title="Manage Users" />
        <Card.Content>
          <Text style={styles.statText}>Add, edit, or remove users.</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => router.navigate("/admin/(tabs)/users")}
          >
            Manage Users
          </Button>
        </Card.Actions>
      </Card>

      {/* View Reports */}
      <Card style={styles.card}>
        <Card.Title title="Add Employer" />
        <Card.Content>
          <Text style={styles.statText}>
            Add new Employer to the system.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => router.navigate("/admin/(tabs)/newEmployer")}
          >
            Add Employer
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
