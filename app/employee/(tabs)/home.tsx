import { useAuth, useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Button } from "react-native-paper";



export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useAuth();
  const router = useRouter();
  // const [token, setToken] = useState<string | null>(null);
  // const backendApi = process.env.BACKEND_API_ENDPOINT
  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        // Fetch the token
        const token = await getToken();
        // setToken(fetchedToken);
        // console.log("Token fetched:", token);

        // fetch(`${backendApi}/api/users`, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     // Handle the fetched data
        //     console.log("data---->", data);
        //   })
        //   .catch((error) => {
        //     // Handle any errors
        //     console.error("Error fetching employee data:", error);
        //   });

        // Fetch employee data using the token
        // const response = await fetch("http://localhost:3000/api/users", {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${fetchedToken}`,
        //   },
        // });

        // const data = await response.json();
        // setEmployeeData(data);
        // console.log("Employee data fetched:", data);
      } catch (error) {
        console.error("Error fetching token or employee data:", error);
      }
    };

    fetchTokenAndData();
  }, [getToken]);

  // const token = await getToken();
  // console.log("token----->", token);

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/users", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${getToken()}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Handle the fetched data
  //       console.log("data---->", data);
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //       console.error("Error fetching employee data:", error);
  //     });
  // }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const employeeCredits = 10; // Placeholder for employee credits
  const companyCredits = 100; // Placeholder for company credits
  const systemCredits = 1000; // Placeholder for system credits
  // source={matches}
  return (
    <ImageBackground style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.title}>🌱 Welcome to Carbon Credits App</Text>

        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Welcome, {user?.firstName || "User"}!
          </Text>

          <Text>You earned {employeeCredits} credits this month!</Text>

          {/* Quick Actions */}
          <View style={{ marginTop: 16 }}>
            <Button
              mode="contained"
              onPress={() => router.navigate("/employee/(tabs)/commute")}
              style={{ marginBottom: 8 }}
            >
              Track Commute
            </Button>
            <Button
              mode="contained"
              onPress={() => router.navigate("/employee/(tabs)/analytics")}
              style={{ marginBottom: 8 }}
            >
              View Analytics
            </Button>
            <Button
              mode="contained"
              onPress={() => router.navigate("/employee/(tabs)/credits")}
              style={{ marginBottom: 8 }}
            >
              Trade Credits
            </Button>
          </View>
        </View>

        <Button mode="outlined" onPress={handleSignOut} style={styles.button}>
          Sign Out
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.85)", // optional: soften background
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  subtext: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    marginVertical: 8,
  },
});
