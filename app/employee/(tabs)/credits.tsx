import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";

export default function Credits() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Carbon Credits</Text>

      {/* Credits Summary */}
      <Card style={styles.card}>
        <Card.Title title="Credits Summary" />
        <Card.Content>
          <Text style={styles.creditText}>Available Credits: 1,200</Text>
          <Text style={styles.creditText}>Total Earned: 5,000</Text>
        </Card.Content>
      </Card>

      {/* Transaction History */}
      <Card style={styles.card}>
        <Card.Title title="Transaction History" />
        <Card.Content>
          <Text style={styles.transactionText}>- Purchased 200 Credits</Text>
          <Text style={styles.transactionText}>
            + Earned 100 Credits (Commute)
          </Text>
          <Text style={styles.transactionText}>- Redeemed 50 Credits</Text>
        </Card.Content>
      </Card>

      {/* Actions */}
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => {}} style={styles.button}>
          Redeem Credits
        </Button>
        <Button mode="outlined" onPress={() => {}} style={styles.button}>
          Trade Credits
        </Button>
      </View>
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
  creditText: {
    fontSize: 16,
    marginBottom: 4,
  },
  transactionText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#666",
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
