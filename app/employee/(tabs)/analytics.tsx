import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, ProgressBar, Button } from "react-native-paper";

export default function Analytics() {
  const { getToken } = useAuth();

  const [analyticsData, setAnalyticsData] = useState<any>({
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
  const backendApi = process.env.BACKEND_API_ENDPOINT;

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        // Fetch the token
        const token = await getToken();
        // setToken(fetchedToken);
        // console.log("Token fetched:", token);

        fetch(`${backendApi}/api/analytics`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the fetched data
            // console.log("data---->", data);
            setAnalyticsData(data);
          })
          .catch((error) => {
            // Handle any errors
            console.error("Error fetching analytics data:", error);
          });
      } catch (error) {
        console.error("Error fetching token or employee data:", error);
      }
    };

    fetchTokenAndData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>User Analytics</Text>

      {/* Carbon Credits Summary */}
      <Card style={styles.card}>
        <Card.Title title="Carbon Credits Earned" />
        <Card.Content>
          <Text style={styles.creditText}>
            Total: {analyticsData.total_credits} Credits
          </Text>
          <Text style={styles.creditText}>
            Total: {analyticsData.total_points} Points
          </Text>
        </Card.Content>
      </Card>

      {/* Commute Data */}
      <Card style={styles.card}>
        <Card.Title title="Commute Data" />
        <Card.Content>
          <Text style={styles.dataText}>
            Public Transport:{" "}
            <Text style={styles.dataNumber}>
              {analyticsData.breakdown.public_transport.percentage}%
            </Text>
          </Text>
          <Text style={styles.dataText}>
            Carpooling:{" "}
            <Text style={styles.dataNumber}>
              {analyticsData.breakdown.carpooling.percentage}%
            </Text>
          </Text>
          <Text style={styles.dataText}>
            Work From Home:{" "}
            <Text style={styles.dataNumber}>
              {analyticsData.breakdown.work_from_home.percentage}%
            </Text>
          </Text>
          <Text style={styles.dataText}>
            Private Vehicle:{" "}
            <Text style={styles.dataNumber}>
              {analyticsData.breakdown.private_vehicle.percentage}%
            </Text>
          </Text>
        </Card.Content>
      </Card>

      {/* Progress Tracking */}
      {/* <Card style={styles.card}>
        <Card.Title title="Progress Tracking" />
        <Card.Content>
          <Text style={styles.dataText}>Monthly Goal: 200 Credits</Text>
          <ProgressBar
            progress={0.6}
            color="#4CAF50"
            style={styles.progressBar}
          />
          <Text style={styles.dataText}>60% Completed</Text>
        </Card.Content>
      </Card> */}
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
  dataText: {
    fontSize: 14,
    marginBottom: 4,
  },
  dataNumber: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  progressBar: {
    marginTop: 8,
    height: 8,
    borderRadius: 4,
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
