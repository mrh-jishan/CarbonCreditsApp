import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Button, Card } from "react-native-paper";
import { Stack, useLocalSearchParams } from "expo-router";

export default function CarbonCredit() {
  const { userId } = useLocalSearchParams();
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<any>(null);
  const [carbonCreditData, setCarbonCreditData] = useState<any>({
    total_points: 0,
    total_credits: 0,
    breakdown: {
      public_transport: {
        count: 0,
        points: 0,
      },
      carpooling: {
        count: 0,
        points: 0,
      },
      work_from_home: {
        count: 0,
        points: 0,
      },
      private_vehicle: {
        count: 0,
        points: 0,
      },
    },
  });

  const { getToken } = useAuth();
  const backendApi = process.env.BACKEND_API_ENDPOINT;

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      try {
        const response = await fetch(`${backendApi}/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const { user, role } = await response.json();
        setUserRole(role.data[0]);
        setUser(user);
      } catch (error) {
        console.error("Error fetching employer data:", error);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      try {
        const response = await fetch(
          `${backendApi}/api/carbon_credits/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("data----: ", data);
        // console.log("role----: ", role.data);
        setCarbonCreditData(data);
      } catch (error) {
        console.error("Error fetching employer data:", error);
      }
    };
    fetchUser();
  }, [userId]);

  if (!userRole) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Role not found. Please contact support.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Carbon Credits - ${
            userRole.role === "org:carbon_credits_employer"
              ? "Employer"
              : "Employee"
          }`,
        }}
      />
      <Text style={styles.header}>Carbon Credits</Text>

      {/* User Information Section */}
      <Card style={styles.card}>
        <Card.Title title="User Information" />
        <Card.Content>
          <Text style={styles.text}>
            <Text style={styles.label}>Name:</Text> {user?.first_name}{" "}
            {user?.last_name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Email:</Text>{" "}
            {user?.email_addresses[0]?.email_address}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Role:</Text> {userRole.role_name}
          </Text>
        </Card.Content>
      </Card>

      {/* Carbon Credit Section */}
      {userRole.role === "org:carbon_credits_employee" ? (
        <Card style={styles.card}>
          <Card.Title title="Employee Carbon Credits" />
          <Card.Content>
            <Text style={styles.text}>
              🌱 You have earned{" "}
              <Text style={styles.highlight}>
                {carbonCreditData.total_credits} Carbon Credits
              </Text>{" "}
              this period of time.
            </Text>
            <Text style={styles.text}>Breakdown of your credits:</Text>
            <View style={styles.breakdown}>
              <Text style={styles.breakdownItem}>
                🚴‍♂️ Public Transport:{" "}
                {carbonCreditData.breakdown.public_transport.points} Credits
              </Text>
              <Text style={styles.breakdownItem}>
                🚗 Carpooling: {carbonCreditData.breakdown.carpooling.points}{" "}
                Credits
              </Text>
              <Text style={styles.breakdownItem}>
                🏠 Work From Home:{" "}
                {carbonCreditData.breakdown.work_from_home.points} Credits
              </Text>
              <Text style={styles.breakdownItem}>
                🚙 Private Vehicle:{" "}
                {carbonCreditData.breakdown.private_vehicle.points} Credits
              </Text>
            </View>
          </Card.Content>
        </Card>
      ) : userRole.role === "org:carbon_credits_employer" ? (
        <Card style={styles.card}>
          <Card.Title title="Employer Carbon Credits" />
          <Card.Content>
            <Text style={styles.text}>
              🏢 Your company has{" "}
              <Text style={styles.highlight}>
                {" "}
                {carbonCreditData.total_points} Carbon Points
              </Text>{" "}
              available.
            </Text>
            <Text style={styles.text}>Breakdown of your credits:</Text>
            <View style={styles.breakdown}>
              <Text style={styles.breakdownItem}>
                💡 Energy Efficiency:{" "}
                {carbonCreditData.breakdown.public_transport.points +
                  carbonCreditData.breakdown.work_from_home.points}{" "}
                Credits
              </Text>
              <Text style={styles.breakdownItem}>
                🗑️ Private Vehicle:{" "}
                {carbonCreditData.breakdown.private_vehicle.points} Credits
              </Text>
              <Text style={styles.breakdownItem}>
                🎁 Employee Incentives:{" "}
                {carbonCreditData.breakdown.carpooling.points} Credits
              </Text>
            </View>
          </Card.Content>
        </Card>
      ) : (
        <Text style={styles.errorText}>
          Invalid role. Please contact support.
        </Text>
      )}
    </View>
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
    // width: "100%",
    // maxWidth: 400,
    backgroundColor: "#ffffff",
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  highlight: {
    fontWeight: "bold",
    color: "#00796b",
  },
  breakdown: {
    marginTop: 8,
    marginBottom: 8,
  },
  breakdownItem: {
    fontSize: 14,
    marginBottom: 4,
    color: "#555",
  },
});
