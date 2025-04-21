import { useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { View, Image, StyleSheet } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";

const ROLES = [
  { label: "Employee", value: "employee" },
  { label: "Employer", value: "employer" },
  { label: "Representative", value: "representative" },
];

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [role, setRole] = useState("employee");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
        unsafeMetadata: {
          role: role,
        },
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setErrorMessage("An error occurred during sign-up.");
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        setErrorMessage("Verification failed. Please try again.");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setErrorMessage("An error occurred during verification.");
    }
  };

  if (pendingVerification) {
    return (
      <View style={{ padding: 20, flex: 1, justifyContent: "center", gap: 8 }}>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <Button onPress={onVerifyPress} mode="contained">
          Verify
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <View style={{ gap: 8, display: "flex" }}> */}
      <Image
        source={require("../../assets/images/react-logo.png")} // Replace with your logo path
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <DropDownPicker
          open={open}
          setOpen={setOpen}
          value={role}
          setValue={setRole}
          items={ROLES}
        />

        <TextInput
          autoCapitalize="none"
          value={firstName}
          placeholder={`Enter ${role} first name`}
          onChangeText={(firstName) => setFirstName(firstName)}
        />

        <TextInput
          autoCapitalize="none"
          value={lastName}
          placeholder={`Enter ${role} last name`}
          onChangeText={(lastName) => setLastName(lastName)}
        />

        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <Button
        onPress={onSignUpPress}
        mode="contained"
        style={{ marginTop: 16 }}
      >
        Register
      </Button>

      <View style={styles.signUpContainer}>
        <Text>Already have an account?</Text>
        <Link href="/auth/sign-in">
          <Text style={{ color: "blue" }}>Sign In</Text>
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
