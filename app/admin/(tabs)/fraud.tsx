import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card, Button } from "react-native-paper";

const suspiciousActivities = [
  {
    id: "1",
    user: "John Doe",
    description: "Unusual commute data",
    date: "2025-04-01",
  },
  {
    id: "2",
    user: "Jane Smith",
    description: "Duplicate travel entries",
    date: "2025-04-03",
  },
  {
    id: "3",
    user: "Michael Brown",
    description: "Excessive manual entries",
    date: "2025-04-05",
  },
];

export default function Fraud() {

    const router = useRouter();
    
  const handleViewDetails = (activity: any) => {
    console.log(`Viewing details for suspicious activity: ${activity.id}`);
    // Add logic to navigate to a detailed view or handle the activity
    router.navigate("/admin/profileDetails");
  };

  const renderActivity = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Title title={item.user} subtitle={`Date: ${item.date}`} />
      <Card.Content>
        <Text style={styles.description}>{item.description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => handleViewDetails(item)}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fraud Detection</Text>
      <FlatList
        data={suspiciousActivities}
        keyExtractor={(item) => item.id}
        renderItem={renderActivity}
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
