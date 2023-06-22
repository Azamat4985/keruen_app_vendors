import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Platform } from "react-native";
import { GlobalStyles } from "../theme/styles";
import { colors } from "src/theme/colors";
import { validateEmail } from "src/helpers/validators";
import { validatePassword } from "src/helpers/validators";

const CustomTextInput = ({ capitalize, length, placeholder, setter, value, marginBottom, multiline, keyboardType, rule, failText, vendorData }) => {
  const [currentLength, setCurrentLength] = useState(value ? value.length : 0);
  const [ruleOk, setRuleOk] = useState(null);
  if(capitalize == null){
    capitalize = 'sentences';
  }

  function changeHandler(text) {
    if (rule == null) {
      if (text != " ") {
        setCurrentLength(text.length);
        console.log(text);
        setter(text);
      }
    }
    if (rule == "email") {
      setRuleOk(validateEmail(text));
    }
    if (rule == "password") {
      setRuleOk(validatePassword(text));
    }
    if (rule == "confirmPassword") {
      if (text == vendorData.password) {
        setRuleOk(true);
      } else{
        setRuleOk(false)
      }
    }
    if (text != " ") {
      setCurrentLength(text.length);
      console.log(text);
      setter(text);
    }
  }

  if (multiline) {
    return (
      <View style={{ marginBottom: marginBottom }}>
        <TextInput
          multiline={multiline}
          style={[GlobalStyles.textInput, { marginBottom: 5, paddingTop: 10 }]}
          placeholder={placeholder}
          maxLength={length}
          onChangeText={changeHandler}
          value={value}
        />
        {length ? (
          <Text style={{ textAlign: "right", color: "#5c5c5c" }}>
            {" "}
            {currentLength} / {length}
          </Text>
        ) : (
          <View></View>
        )}
      </View>
    );
  } else {
    return (
      <View style={{ marginBottom: marginBottom }}>
        <TextInput
          keyboardType={keyboardType}
          style={[GlobalStyles.textInput, { marginBottom: 5 }, !ruleOk && ruleOk != null ? { borderColor: colors.danger } : ""]}
          placeholder={placeholder}
          onChangeText={changeHandler}
          maxLength={length}
          autoCapitalize={capitalize}
          value={value}
        />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          {!ruleOk && ruleOk != null ? <Text style={[GlobalStyles.smallText, { color: colors.danger }]}>{failText}</Text> : <View></View>}
          {length ? (
            <Text style={{ textAlign: "right", color: "#5c5c5c" }}>
              {" "}
              {currentLength} / {length}
            </Text>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({});

export default CustomTextInput;
