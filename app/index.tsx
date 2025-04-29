import { useRoles } from "@/hooks/useRoles";
import { useUser } from "@clerk/clerk-expo";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Page() {
  const { isAdmin, isEmployee, isEmployer, isBank } = useRoles();
  const { isSignedIn } = useUser();
  const { orgId } = useAuth();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (isAdmin) {
    return <Redirect href={"/admin/(tabs)/home"} />;
  }

  if (isEmployer) {
    return <Redirect href={"/employer/(tabs)/home"} />;
  }

  if (isEmployee) {
    return <Redirect href={"/employee/(tabs)/home"} />;
  }

  if (isBank) {
    return <Redirect href={"/bank/(tabs)/home"} />;
  }

  if (isSignedIn && !orgId) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please wait until your account is approved!</Text>
        <Button
          mode="outlined"
          onPress={handleSignOut}
          style={{ marginVertical: 8 }}
        >
          Sign Out
        </Button>
      </View>
    );
  }

  return <Redirect href="/auth/sign-in" />;
}
