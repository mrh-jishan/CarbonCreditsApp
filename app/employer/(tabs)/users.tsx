import { useAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Card, Button } from "react-native-paper";

export default function Users() {
  const renderEmployee = ({ item }: any) => {
    // console.log("item-----------: ", item);
    return (
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

        {!["Carbon Credits Admin", "Carbon Credits Bank"].includes(
          item.role_name
        ) && (
          <Card.Actions>
            <Link
              href={`/employer/pages/carbonCredit/${item.public_user_data.user_id}`}
            >
              <Text style={{ color: "blue" }}>View Details</Text>
            </Link>
          </Card.Actions>
        )}
      </Card>
    );
  };

  const backendApi = process.env.BACKEND_API_ENDPOINT;

  const roles = [
    { label: "All Roles", value: "users" },
    { label: "Employees", value: "employees" },
    { label: "Employers", value: "employers" },
  ];

  const [employers, setEmployers] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>("users");
  const { getToken } = useAuth();

  const [filteredEmployers, setFilteredEmployers] = useState<any>([]);

  useEffect(() => {
    // console.log("selectedRole", selectedRole);

    const fetchEmployers = async () => {
      const token = await getToken();
      try {
        const response = await fetch(`${backendApi}/api/${selectedRole}`, {
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
  }, [selectedRole]);

  const handleFilterChange = (role: string | null) => {
    setSelectedRole(role);
    if (role) {
      const filtered = employers.filter(
        (employer: any) => employer.role_name === role
      );
      setFilteredEmployers(filtered);
    } else {
      setFilteredEmployers(employers); // Reset to all employers if no role is selected
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users</Text>

      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={selectedRole}
        setValue={setSelectedRole}
        items={roles}
        placeholder="Filter by Role"
        style={styles.dropdown}
      />

      <FlatList
        data={employers}
        keyExtractor={(item) => item.id}
        renderItem={renderEmployee}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users to display</Text>
          </View>
        )}
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
  dropdown: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
});
