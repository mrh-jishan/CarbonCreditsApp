import { useRoles } from "@/hooks/useRoles";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Button } from "react-native-paper";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const { isAdmin, isEmployee, isEmployer, isBank } = useRoles();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // source={matches}
  return (
    <ImageBackground style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.title}>🌱 Welcome to Carbon Credits App</Text>

        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Welcome, {user?.firstName || "User"}!
          </Text>

          <Text>
            Logged in as{" "}
            <Text style={{ fontWeight: "600" }}>
              {user?.emailAddresses[0].emailAddress}
            </Text>
          </Text>
          {/* <Text>Logged in as Bank</Text> */}

          {/* Quick Actions */}
          <View style={{ marginTop: 16 }}>
            <Button
              mode="contained"
              onPress={() => router.navigate("/bank/(tabs)/analytics")}
              style={{ marginBottom: 8 }}
            >
              View Analytics
            </Button>
            <Button
              mode="contained"
              onPress={() => router.navigate("/bank/(tabs)/transactions")}
              style={{ marginBottom: 8 }}
            >
              View Transactions
            </Button>
            <Button
              mode="contained"
              onPress={() => router.navigate("/bank/(tabs)/audit")}
              style={{ marginBottom: 8 }}
            >
              Audit
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
