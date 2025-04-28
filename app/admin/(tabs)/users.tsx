import { useAuth } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card, Button } from "react-native-paper";

export default function Users() {
  const renderEmployee = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Title
        title={`${item.public_user_data.first_name} ${item.public_user_data.last_name}`}
        subtitle={`Role: ${item.role_name}`}
      />
      <Card.Content>
        <Text style={styles.creditText}>
          Email: {item.public_user_data.identifier}
        </Text>
      </Card.Content>
    </Card>
  );

  const backendApi = process.env.BACKEND_API_ENDPOINT;

  const [employers, setEmployers] = useState<any>([]);

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchEmployers = async () => {
      const token = await getToken();
      try {
        const response = await fetch(`${backendApi}/api/employers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = await response.json();
        setEmployers(data);
      } catch (error) {
        console.error("Error fetching employer data:", error);
      }
    };
    fetchEmployers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users</Text>
      <FlatList
        data={employers}
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
