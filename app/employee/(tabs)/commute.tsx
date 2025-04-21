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
import * as TaskManager from "expo-task-manager";
import { ScrollView } from "react-native";

const LOCATION_TASK_NAME = "background-location-task";

export default function Commute() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    const checkPermissionsAndStartTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to track your commute."
        );
        return;
      }

      const backgroundStatus =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus.status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Background location permission is required to track your commute in the background."
        );
        return;
      }
    };

    checkPermissionsAndStartTracking();
  }, []);

  const handleStartCommute = async () => {
    if (!fromLocation || !toLocation) {
      Alert.alert("Error", "Please fill in both 'From' and 'To' locations.");
      return;
    }

    if (!selectedMode) {
      Alert.alert("Error", "Please select a mode of transportation.");
      return;
    }

    setIsTracking(true);

    try {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 100, // Update every second
        distanceInterval: 1, // Update every meter
        showsBackgroundLocationIndicator: true,
      });

      Alert.alert(
        "Tracking Started",
        "Commute tracking has started. Please end the commute when you reach your destination."
      );
    } catch (error) {
      console.error("Error starting commute tracking:", error);
      Alert.alert(
        "Error",
        "Failed to start commute tracking. Please try again."
      );
      setIsTracking(false);
    }
  };

  const handleEndCommute = async () => {
    try {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);

      Alert.alert("Success", "Commute tracking has ended.");
      setFromLocation("");
      setToLocation("");
      setSelectedMode("");
    } catch (error) {
      console.error("Error ending commute tracking:", error);
      Alert.alert("Error", "Failed to end commute tracking. Please try again.");
    } finally {
      setIsTracking(false);
    }
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

        {/* Start and End Commute Buttons */}
        {!isTracking ? (
          <Button
            mode="contained"
            onPress={handleStartCommute}
            style={styles.trackButton}
          >
            Start Commute
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={handleEndCommute}
            style={styles.trackButton}
          >
            End Commute
          </Button>
        )}

        {/* Loading Indicator */}
        {isTracking && (
          <ActivityIndicator animating={true} style={styles.loader} />
        )}
      </View>
    </ScrollView>
  );
}

// Define the background task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }: any) => {
  if (error) {
    console.error("Error in background location task:", error);
    return;
  }

  if (data) {
    const { locations } = data;
    const location = locations[0];

    if (location) {
      const speed = location.coords.speed || 0;
      const backendData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        speed,
        timestamp: new Date().toISOString(),
      };

      console.log("Sending location data to backend:", backendData);

      // Example API call to send location data to the backend
      // await fetch("https://your-backend-api.com/location", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(backendData),
      // });
    }
  }
});

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
