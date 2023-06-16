import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../../theme/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Step1 from "./Step1";
import Step2 from "./Step2";

const allSteps = 2;

const RegisterScreen = () => {
  const [screenNumber, setScreenNumber] = useState(1);
  const [vendorData, setVendorData] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    console.log(vendorData);
  }, [vendorData])

  function incrementHandler() {
    let currentNumber = screenNumber;
    if (screenNumber != allSteps) {
      currentNumber++;
    }

    setScreenNumber(currentNumber);
  }

  function decrementHandler() {
    let currentNumber = screenNumber;
    if (screenNumber != 1) {
      currentNumber--;
    }

    setScreenNumber(currentNumber);
  }

  const CurrentScreen = () => {
    switch (screenNumber) {
      case 1:
        return <Step1 vendorData={vendorData} setVendorData={setVendorData}/>;
        break;

      case 2:
        return <Step2 />;

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={[GlobalStyles.container, { backgroundColor: "#fff", flex: 1 }]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView>
          <View style={{ flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30, justifyContent: "center" }}>
                <Text style={[GlobalStyles.title, { textAlign: "center", marginBottom: 0 }]}>Регистрация</Text>
                <Text style={[GlobalStyles.text, { marginStart: 10 }]}> | шаг {screenNumber}</Text>
              </View>

              {CurrentScreen()}
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              {screenNumber != 1 ? (
                <TouchableOpacity
                  onPress={() => {
                    decrementHandler();
                  }}
                >
                  <Text style={[GlobalStyles.text]}>Упс, назад</Text>
                </TouchableOpacity>
              ) : (
                <View></View>
              )}

              <TouchableOpacity
                onPress={() => {
                  incrementHandler();
                }}
                style={[GlobalStyles.darkBtn, { width: 100 }]}
              >
                <Text style={[GlobalStyles.text, { color: "#fff" }]}>Далее</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default RegisterScreen;
