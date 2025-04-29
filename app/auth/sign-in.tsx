import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button } from "react-native-paper";
import React, { useCallback, useState } from "react";
import { View, Image, StyleSheet } from "react-native";


export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { getToken } = useAuth();
  const backendApi = process.env.BACKEND_API_ENDPOINT
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        const token = await getToken();
        fetch(`${backendApi}/api/users`, {
          method: "POST",
          body: JSON.stringify({
            email: emailAddress,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the fetched data
            console.log("data---->", data);
          })
          .catch((error) => {
            // Handle any errors
            console.error("Error fetching employee data:", error);
          });

        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setErrorMessage(
          "Please wait till your account verification is complete."
        );
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setErrorMessage("An error occurred during sign-in.");
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/react-logo.png")} // Replace with your logo path
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter your email"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          value={password}
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <Button
        onPress={onSignInPress}
        mode="contained"
        style={{ marginTop: 16 }}
      >
        Sign in
      </Button>

      <View style={{ marginTop: 24, alignItems: "center" }}>
        <Text>Don't have an account?</Text>
        <Link href="/auth/sign-up">
          <Text style={{ color: "blue" }}>Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: { width: "100%", gap: 8 },
  errorText: {
    color: "red",
    marginVertical: 8,
    textAlign: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  signUpContainer: { marginTop: 24, alignItems: "center" },
});
