import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { GlobalStyles } from "../../../theme/styles";

const Step2 = () => {
  return (
    <View>
      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Email</Text>
      <TextInput style={[GlobalStyles.textInput, { marginBottom: 15 }]} placeholder="Введите ваш email" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Step2;
