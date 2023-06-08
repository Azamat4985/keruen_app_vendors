import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";

const AuthScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Auth screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthScreen;
