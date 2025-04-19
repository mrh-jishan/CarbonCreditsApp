import { useRoles } from "@/hooks/useRoles";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
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

  const employeeCredits = 10; // Placeholder for employee credits
  const companyCredits = 100; // Placeholder for company credits
  const systemCredits = 1000; // Placeholder for system credits
  // source={matches}
  return (
    <ImageBackground style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <SignedIn>
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

            {/* Role-Specific Summary */}
            {isEmployee && (
              <Text>You earned {employeeCredits} credits this month!</Text>
            )}
            {isEmployer && (
              <Text>Your company saved {companyCredits} credits!</Text>
            )}
            {isAdmin && <Text>System-wide credits: {systemCredits}</Text>}

            {/* Quick Actions */}
            <View style={{ marginTop: 16 }}>
              <Button
                mode="contained"
                onPress={() => router.navigate("/(tabs)/commute")}
                style={{ marginBottom: 8 }}
              >
                Track Commute
              </Button>
              <Button
                mode="contained"
                onPress={() => router.navigate("/(tabs)/analytics")}
                style={{ marginBottom: 8 }}
              >
                View Analytics
              </Button>
              <Button
                mode="contained"
                onPress={() => router.navigate("/(tabs)/trading")}
                style={{ marginBottom: 8 }}
              >
                Trade Credits
              </Button>
            </View>

            {/* Notifications */}
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontWeight: "bold" }}>Notifications:</Text>
              {isEmployer && <Text>3 employees pending approval</Text>}
              {isAdmin && (
                <Text>Fraud alert: 1 suspicious activity detected</Text>
              )}
            </View>
          </View>

          <Button mode="outlined" onPress={handleSignOut} style={styles.button}>
            Sign Out
          </Button>
        </SignedIn>

        <SignedOut>
          <Text style={styles.title}>Welcome to Carbon Credits App</Text>
          <Text style={styles.subtext}>
            Please sign in or create an account to get started.
          </Text>

          <Link href="/(auth)/sign-in" asChild>
            <Button mode="contained" style={styles.button}>
              Sign In
            </Button>
          </Link>

          <Link href="/(auth)/sign-up" asChild>
            <Button mode="outlined" style={styles.button}>
              Sign Up
            </Button>
          </Link>
        </SignedOut>
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
