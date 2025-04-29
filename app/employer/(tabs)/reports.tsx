import { useAuth } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { Card, Button, Divider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Reports() {
  const { getToken } = useAuth();
  const router = useRouter();

  const [transactionData, setTransactionData] = useState<any>({
    total_points: 0,
    total_credits: 0,
    breakdown: [],
  });
  const backendApi = process.env.BACKEND_API_ENDPOINT;

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const token = await getToken();

        fetch(`${backendApi}/api/transactions?scope=all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTransactionData(data);
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

  const insertBulkData = async () => {
    console.log("Inserting bulk data...", backendApi);
    const token = await getToken();
    fetch(`${backendApi}/api/seeds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data inserted successfully:", data);
        router.navigate("/employer/(tabs)/home");
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Carbon Credits</Text>

      {/* Credits Summary */}
      <Card style={styles.card}>
        <Card.Title title="Credits Summary" />
        <Card.Content>
          <View style={styles.summaryRow}>
            <MaterialIcons name="stars" size={24} color="#4CAF50" />
            <Text style={styles.creditText}>
              Total Credits: {transactionData.total_credits}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <MaterialIcons name="emoji-events" size={24} color="#FFC107" />
            <Text style={styles.creditText}>
              Total Points: {transactionData.total_points}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Transaction History */}
      <Card style={styles.card}>
        <Card.Title title="Transaction History" />
        <Card.Content>
          <FlatList
            data={transactionData.breakdown}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.transactionRow}>
                <MaterialIcons
                  name="attach-money"
                  size={20}
                  color="#4CAF50"
                  style={styles.transactionIcon}
                />
                <Text style={styles.transactionText}>
                  + Earned {item.points} Credits ({item.transport_mode}) -{" "}
                  {item.date}
                </Text>
              </View>
            )}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No transactions available.</Text>
            }
          />
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={insertBulkData}
            style={{ marginTop: 8 }}
          >
            Create Data For Employee
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
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  creditText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  transactionIcon: {
    marginRight: 8,
  },
  transactionText: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    marginVertical: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
});
