import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, Card, Button } from "react-native-paper";
import { useUser } from "@clerk/clerk-expo";
import { useRoles } from "@/hooks/useRoles";

export default function ProfileDetails() {
  const { user } = useUser();
  const { isAdmin, isEmployee, isEmployer, isBank } = useRoles();

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
        <Text style={styles.role}>
          {isAdmin && "Admin"}
          {isEmployee && "Employee"}
          {isEmployer && "Employer"}
          {isBank && "Bank"}
        </Text>
      </View>

      {/* Carbon Credits Summary */}
      <Card style={styles.card}>
        <Card.Title title="Carbon Credits Summary" />
        <Card.Content>
          <Text style={styles.creditText}>This Month: 120 Credits</Text>
          <Text style={styles.creditText}>Total: 1,450 Credits</Text>
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
