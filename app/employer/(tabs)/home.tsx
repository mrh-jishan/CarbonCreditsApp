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

            {/* Quick Actions */}
            <View style={{ marginTop: 16 }}>
              <Button
                mode="contained"
                onPress={() => router.navigate("/employer/(tabs)/users")}
                style={{ marginBottom: 8 }}
              >
                Employee List
              </Button>
              <Button
                mode="contained"
                onPress={() => router.navigate("/employer/(tabs)/newEmployee")}
                style={{ marginBottom: 8 }}
              >
                Create new Employee
              </Button>
              <Button
                mode="contained"
                onPress={() => router.navigate("/employer/(tabs)/profile")}
                style={{ marginBottom: 8 }}
              >
                Profile
              </Button>
            </View>
          </View>

          <Button mode="outlined" onPress={handleSignOut} style={styles.button}>
            Sign Out
          </Button>
        </SignedIn>
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
