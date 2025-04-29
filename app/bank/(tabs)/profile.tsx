import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRoles } from "@/hooks/useRoles";

export default function ProfileDetails() {
  const { user } = useUser();
  const { roleName } = useRoles();
  const { getToken } = useAuth();

  const [analyticsData, setAnalyticsData] = useState<any>({
    total_points: 0,
    total_credits: 0,
  });

  const backendApi = process.env.BACKEND_API_ENDPOINT;

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        // Fetch the token
        const token = await getToken();
        fetch(`${backendApi}/api/analytics?scope=all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setAnalyticsData(data);
          })
          .catch((error) => {
            console.error("Error fetching analytics data:", error);
          });
      } catch (error) {
        console.error("Error fetching token or employee data:", error);
      }
    };

    fetchTokenAndData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* User Info */}
      <View style={styles.profileHeader}>
        <Avatar.Text
          size={80}
          label={user?.firstName?.[0] || "" + user?.lastName?.[0] || "U"}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.email}>
          {user?.emailAddresses?.[0]?.emailAddress}
        </Text>
        <Text style={styles.role}>{roleName}</Text>
      </View>

      {/* Carbon Credits Summary */}
      <Card style={styles.card}>
        <Card.Title title="Carbon Credits Summary in the system" />
        <Card.Content>
          <Text style={styles.creditText}>
            Total: {analyticsData.total_credits} Credits
          </Text>
          <Text style={styles.creditText}>
            Total: {analyticsData.total_points} Points
          </Text>
        </Card.Content>
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
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    backgroundColor: "#4CAF50",
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
  },
  creditText: {
    fontSize: 16,
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
