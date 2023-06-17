import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../../theme/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";

const allSteps = 2;

const RegisterScreen = ({ route }) => {
  const navigation = useNavigation();
  const [screenNumber, setScreenNumber] = useState(1);
  const [vendorData, setVendorData] = useState({
    name: "",
    description: "",
    vendorName: "",
    region: "",
    city: "",
    address: "",
  });
  const [avatar, setAvatar] = useState(require("../../../../assets/default_avatar.jpg"));

  useEffect(() => {
    console.log(vendorData);
  }, [vendorData]);

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
        return (
          <Step1
            route={route}
            vendorData={vendorData}
            setVendorData={setVendorData}
            avatar={avatar}
            setAvatar={setAvatar}
          />
        );
        break;

      case 2:
        return (
          <Step2
            vendorData={vendorData}
            setVendorData={setVendorData}
          />
        );

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
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 30 }}>
                <TouchableOpacity onPress={(() => {navigation.goBack()})}>
                  <Ionicons name="arrow-back-circle-outline" size={30}/>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                  <Text style={[GlobalStyles.title, { textAlign: "center", marginBottom: 0 }]}>Регистрация</Text>
                  <Text style={[GlobalStyles.text, { marginStart: 10 }]}> | шаг {screenNumber}</Text>
                </View>

                <View></View>

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
