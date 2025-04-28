import { useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Alert } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

export default function SignUpScreen() {
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const { getToken } = useAuth();

  const backendApi = process.env.BACKEND_API_ENDPOINT;

  const onSignUpPress = async () => {
    try {
      // Fetch the token
      const token = await getToken();
      fetch(`${backendApi}/api/employers`, {
        method: "POST",
        body: JSON.stringify({
          email_address: emailAddress,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data============", data);
          Alert.alert(
            "Invitation Sent",
            `An invitation has been sent to ${emailAddress}.`,
            [
              {
                text: "Cancel",
                onPress: () => Alert.alert("Cancel Pressed"),
                style: "cancel",
              },
            ]
          );
          router.navigate("/admin/(tabs)/home");
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error fetching employee data:", error);
          Alert.alert(
            "Error",
            "An error occurred while sending the invitation."
          );
        });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", "An error occurred while sending the invitation.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Invite a New Employer by Email
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />
      </View>
      <Button
        onPress={onSignUpPress}
        mode="contained"
        style={{ marginTop: 16 }}
      >
        Add New Employer
      </Button>
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
