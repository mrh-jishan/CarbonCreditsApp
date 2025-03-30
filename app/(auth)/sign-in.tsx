import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button } from "react-native-paper";
import React from "react";
import { View } from "react-native";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={{ padding: 20 }}>
      {/* Back Button */}
      <Button onPress={() => router.back()} mode="text">
        ← Back
      </Button>

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
      <Button onPress={onSignInPress} mode="contained" style={{ marginTop: 16 }}>
        Sign in
      </Button>

      <View style={{ marginTop: 24, alignItems: "center" }}>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text style={{ color: "blue" }}>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
