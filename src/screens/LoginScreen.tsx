import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default LoginScreen;
