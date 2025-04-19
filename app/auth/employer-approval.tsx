import { View, Text, StyleSheet } from "react-native";

export default function EmployerApproval() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Employer Approval Screen where registration will be approved
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
