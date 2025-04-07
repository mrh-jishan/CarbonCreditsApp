import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card, RadioButton } from "react-native-paper";

export default function Commute() {
  const [selectedMode, setSelectedMode] = useState("");

  const handleTrackCommute = () => {
    if (selectedMode) {
      console.log(`Commute tracked for mode: ${selectedMode}`);
      // Add logic to track commute based on the selected mode
    } else {
      console.log("Please select a mode of transportation.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Track Your Commute</Text>

      {/* Transportation Mode Selection */}
      <Card style={styles.card}>
        <Card.Title title="Select Mode of Transportation" />
        <Card.Content>
          <RadioButton.Group
            onValueChange={(value) => setSelectedMode(value)}
            value={selectedMode}
          >
            <RadioButton.Item
              label="Public Transport"
              value="public_transport"
            />
            <RadioButton.Item label="Carpooling" value="carpooling" />
            <RadioButton.Item label="Work From Home" value="work_from_home" />
            <RadioButton.Item label="Private Vehicle" value="private_vehicle" />
          </RadioButton.Group>
        </Card.Content>
      </Card>

      {/* Track Commute Button */}
      <Button
        mode="contained"
        onPress={handleTrackCommute}
        style={styles.trackButton}
      >
        Track Commute
      </Button>
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
  card: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
  },
  trackButton: {
    marginTop: 16,
  },
});
