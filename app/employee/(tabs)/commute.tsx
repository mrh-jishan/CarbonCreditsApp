import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
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
import { useAuth } from "@clerk/clerk-expo";

const LOCATION_TASK_NAME = "background-location-task";

export default function Commute() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [browserWatchId, setBrowserWatchId] = useState<number | null>(null);
  const { getToken } = useAuth();
  // const [commuteId, setCommuteId] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS !== "web") {
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
    }
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

    const token = await getToken();
    fetch(`${process.env.BACKEND_API_ENDPOINT}/api/commutes`, {
      method: "POST",
      body: JSON.stringify({
        from_location: fromLocation,
        to_location: toLocation,
        transport_mode: selectedMode,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);

        const commuteId = response.id;
        console.log("commuteId----------->", commuteId);

        // setCommuteId(commuteId);

        if (Platform.OS === "web") {
          // Use browser's Geolocation API
          if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            setIsTracking(false);
            return;
          }

          const watchId = navigator.geolocation.watchPosition(
            async (position) => {
              const { latitude, longitude, speed } = position.coords;
              console.log("Browser Location Update:", {
                latitude,
                longitude,
                speed: speed || 0,
              });

              const token = await getToken();

              console.log("commuteId----------->", commuteId);

              fetch(
                `${process.env.BACKEND_API_ENDPOINT}/api/commutes/${commuteId}/locations`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    latitude,
                    longitude,
                    speed: speed || 0,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              ).catch((error) =>
                console.error("Error sending location data:", error)
              );
            },
            (error) => {
              console.error("Error getting browser location:", error);

              if (error.code === 1) {
                // User denied Geolocation
                alert(
                  // "Location Permission Denied",
                  "Location access is required to track your commute. Please enable location access in your browser settings and try again."
                );
              } else if (error.code === 2) {
                // Position unavailable
                alert(
                  // "Location Unavailable",
                  "Unable to determine your location. Please check your internet connection or try again later."
                );
              } else if (error.code === 3) {
                // Timeout
                alert(
                  // "Location Timeout",
                  "The request to get your location timed out. Please try again."
                );
              }

              setIsTracking(false);
              // console.error("Error getting browser location:", error);
              // Alert.alert("Error", "Failed to get location. Please try again.");
              // setIsTracking(false);
            },
            {
              enableHighAccuracy: true,
              maximumAge: 1000,
              timeout: 5000,
            }
          );

          setBrowserWatchId(watchId);
          Alert.alert(
            "Tracking Started",
            "Commute tracking has started. Please end the commute when you reach your destination."
          );
        }
      })
      .catch((error) => console.error("Error sending location data:", error));

    // if (Platform.OS === "web") {
    //   Alert.alert(
    //     "Tracking Not Supported",
    //     "Commute tracking is not supported in the browser."
    //   );
    //   setIsTracking(false);
    //   return;
    // }

    if (Platform.OS !== "web") {
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
    }
  };

  const handleEndCommute = async () => {
    if (Platform.OS === "web") {
      if (browserWatchId !== null) {
        navigator.geolocation.clearWatch(browserWatchId);
        setBrowserWatchId(null);
        Alert.alert("Success", "Commute tracking has ended.");
      } else {
        Alert.alert("Error", "No active tracking to stop.");
      }
      setIsTracking(false);
      return;
    }

    // if (Platform.OS === "web") {
    //   Alert.alert(
    //     "Tracking Not Supported",
    //     "Commute tracking is not supported in the browser."
    //   );
    //   return;
    // }

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

const backendApi = process.env.BACKEND_API_ENDPOINT;

// Define the background task
if (Platform.OS !== "web") {
  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }: any) => {
    if (error) {
      console.error("Error in background location task:", error);
      return;
    }

    const { getToken } = useAuth();
    const token = await getToken();

    const commuteId = 1; // Replace with the actual commute ID

    if (data) {
      const { locations } = data;
      const location = locations[0];

      if (location) {
        const speed = location.coords.speed || 0;
        const backendData = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          speed,
          transport_mode: location.coords.speed ? "moving" : "stationary",
          timestamp: new Date().toISOString(),
        };

        console.log("Sending location data to backend:", backendData);

        // Example API call to send location data to the backend
        await fetch(`${backendApi}/api/commutes/${commuteId}/locations`, {
          method: "POST",
          body: JSON.stringify(backendData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
  });
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
