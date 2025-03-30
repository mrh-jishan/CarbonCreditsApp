import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Button } from "react-native-paper";
// import matches from '@/assets/images/matches.jpg';

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

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
          <Text style={styles.subtext}>
            Logged in as{" "}
            <Text style={{ fontWeight: "600" }}>
              {user?.emailAddresses[0].emailAddress}
            </Text>
          </Text>

          <Link href="/(tabs)" asChild>
            <Button mode="contained" style={styles.button}>
              Go to Dashboard
            </Button>
          </Link>

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
