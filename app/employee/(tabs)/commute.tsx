import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import {
  Button,
  Card,
  RadioButton,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import * as Location from "expo-location";
import { ScrollView } from "react-native";

export default function Commute() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to track your commute."
        );
        return;
      }

      // Start location tracking
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every second
          distanceInterval: 1, // Update every meter
        },
        (location) => {
          setCurrentLocation(location.coords);
          setSpeed(location.coords.speed || 0); // Speed in meters/second
        }
      );
    };

    startTracking();
  }, []);

  const handleTrackCommute = async () => {
    if (!fromLocation || !toLocation) {
      Alert.alert("Error", "Please fill in both 'From' and 'To' locations.");
      return;
    }

    if (!selectedMode) {
      Alert.alert("Error", "Please select a mode of transportation.");
      return;
    }

    if (!currentLocation) {
      Alert.alert("Error", "Unable to get current location. Please try again.");
      return;
    }

    setIsTracking(true);

    try {
      // Validate GPS data with source and destination
      const isSourceValid = validateLocation(currentLocation, fromLocation);
      const isDestinationValid = validateLocation(currentLocation, toLocation);

      if (!isSourceValid) {
        Alert.alert(
          "Error",
          "Your current location does not match the source location."
        );
        return;
      }

      if (!isDestinationValid) {
        Alert.alert(
          "Error",
          "Your current location does not match the destination location."
        );
        return;
      }

      // Validate speed for mode of transportation
      const isSpeedValid = validateSpeedForMode(speed, selectedMode);
      if (!isSpeedValid) {
        Alert.alert(
          "Error",
          "Your speed does not match the selected mode of transportation."
        );
        return;
      }

      // Send data to backend
      const commuteData = {
        from: fromLocation,
        to: toLocation,
        mode: selectedMode,
        speed,
        currentLocation,
      };

      await sendCommuteDataToBackend(commuteData);

      Alert.alert("Success", "Commute tracked successfully!");
      setFromLocation("");
      setToLocation("");
      setSelectedMode("");
    } catch (error) {
      console.error("Error tracking commute:", error);
      Alert.alert("Error", "Failed to track commute. Please try again.");
    } finally {
      setIsTracking(false);
    }
  };

  const validateLocation = (currentLocation: any, targetLocation: any) => {
    // Placeholder for location validation logic
    // Compare currentLocation with targetLocation (e.g., using geocoding APIs)
    return true; // Assume valid for now
  };

  const validateSpeedForMode = (speed: number, mode: string) => {
    // Validate speed based on mode of transportation
    switch (mode) {
      case "public_transport":
        return speed > 5 && speed < 20; // Example: 5-20 m/s for public transport
      case "carpooling":
        return speed > 5 && speed < 30; // Example: 5-30 m/s for carpooling
      case "work_from_home":
        return speed === 0; // Speed should be 0 for working from home
      case "private_vehicle":
        return speed > 10 && speed < 40; // Example: 10-40 m/s for private vehicles
      default:
        return false;
    }
  };

  const sendCommuteDataToBackend = async (data: any) => {
    // Placeholder for sending data to the backend
    console.log("Sending data to backend:", data);
    // Example API call
    // await fetch("https://your-backend-api.com/commute", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Track Your Commute</Text>

        {/* From and To Location Inputs */}
        <Card style={styles.card}>
          <Card.Title title="Enter Commute Details" />
          <Card.Content>
            <TextInput
              label="From"
              value={fromLocation}
              onChangeText={setFromLocation}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="To"
              value={toLocation}
              onChangeText={setToLocation}
              style={styles.input}
              mode="outlined"
            />
          </Card.Content>
        </Card>

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
              <RadioButton.Item
                label="Private Vehicle"
                value="private_vehicle"
              />
            </RadioButton.Group>
          </Card.Content>
        </Card>

        {/* Track Commute Button */}
        <Button
          mode="contained"
          onPress={handleTrackCommute}
          style={styles.trackButton}
          disabled={isTracking}
        >
          {isTracking ? "Tracking..." : "Track Commute"}
        </Button>

        {/* Loading Indicator */}
        {isTracking && (
          <ActivityIndicator animating={true} style={styles.loader} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  input: {
    marginBottom: 16,
  },
  trackButton: {
    marginTop: 16,
  },
  loader: {
    marginTop: 16,
  },
});
