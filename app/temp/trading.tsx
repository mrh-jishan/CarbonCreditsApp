import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";

const trades = [
  { id: "1", organization: "GreenTech Inc.", credits: 500, price: "$250" },
  { id: "2", organization: "EcoSolutions", credits: 300, price: "$150" },
  { id: "3", organization: "CarbonNeutral Co.", credits: 700, price: "$350" },
];

export default function Trading() {
  const handleBuy = (trade: any) => {
    console.log(`Buying ${trade.credits} credits from ${trade.organization}`);
    // Add logic to handle the buy transaction
  };

  const handleSell = () => {
    console.log("Initiating sell transaction");
    // Add logic to handle the sell transaction
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Trading Marketplace</Text>

      {/* Credit Balance */}
      <Card style={styles.card}>
        <Card.Title title="Your Carbon Credit Balance" />
        <Card.Content>
          <Text style={styles.creditText}>Available Credits: 10,000</Text>
        </Card.Content>
      </Card>

      {/* Available Trades */}
      <Text style={styles.subHeader}>Available Trades</Text>
      {trades.map((trade) => (
        <Card key={trade.id} style={styles.card}>
          <Card.Title title={trade.organization} />
          <Card.Content>
            <Text style={styles.tradeText}>Credits: {trade.credits}</Text>
            <Text style={styles.tradeText}>Price: {trade.price}</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => handleBuy(trade)}>
              Buy
            </Button>
          </Card.Actions>
        </Card>
      ))}

      {/* Sell Credits */}
      <Button mode="outlined" onPress={handleSell} style={styles.sellButton}>
        Sell Credits
      </Button>
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
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
  },
  creditText: {
    fontSize: 16,
    marginBottom: 4,
  },
  tradeText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#666",
  },
  sellButton: {
    marginTop: 16,
  },
});
