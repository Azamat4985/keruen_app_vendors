import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../../theme/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Step3 from "./Step3";
import { serverRequest } from "src/helpers/serverRequests";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAccountData } from "src/store/reducers/accountReducer";

const allSteps = 3;

const RegisterScreen = ({ route }) => {
  const { setLogged } = route.params;
  const navigation = useNavigation();
  const [screenNumber, setScreenNumber] = useState(1);
  const [vendorData, setVendorData] = useState({
    name: "",
    description: "",
    vendorName: "",
    phone: "",
    region: "",
    city: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState(require("../../../../assets/default_avatar.jpg"));
  const [avatarData, setAvatarData] = useState(null);
  const [phoneVerified, setPhoneVerified] = useState(false);

  useEffect(() => {
    console.log(avatarData);
  }, [avatarData]);

  function canGoNext() {
    if (screenNumber == 1) {
      if (vendorData.name == "" || vendorData.description == "" || vendorData.region == "" || vendorData.city == "") {
        // return true;
        return false;
      }
    }
    if (screenNumber == "2" && (!phoneVerified || vendorData.vendorName == "")) {
      // return true;
      return false;
    }
    if (screenNumber == "3") {
      if (vendorData.email == "" || vendorData.password == "" || vendorData.password != vendorData.confirmPassword) {
        return false;
      }
    }

    return true;
  }

  let serverUrl = useSelector((state) => state.settings.serverUrl);
  async function incrementHandler() {
    let currentNumber = screenNumber;
    if (screenNumber != allSteps) {
      currentNumber++;
    } else {
      let formData = new FormData();
      formData.append("vendorData", JSON.stringify(vendorData));
      if (avatarData != null) {
        formData.append("avatar", { uri: avatarData.uri, type: avatarData.type, name: "avatar" });
      }
      let response = await serverRequest(serverUrl, "/vendor/register", "POST", formData);
      if (response.success) {
        setLogged(true);
        await AsyncStorage.setItem('token', response.data.token);
        const dispatch = useDispatch();
        dispatch(setAccountData(response.data))
      }
      // finish registration
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
            setAvatarData={setAvatarData}
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
            phoneVerified={phoneVerified}
            setPhoneVerified={setPhoneVerified}
          />
        );

      case 3:
        return (
          <Step3
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Ionicons
                    name="arrow-back-circle-outline"
                    size={30}
                  />
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                  <Text style={[GlobalStyles.title, { textAlign: "center", marginBottom: 0 }]}>Регистрация</Text>
                  <Text style={[GlobalStyles.text, { marginStart: 10 }]}>
                    {" "}
                    | шаг {screenNumber}/{allSteps}
                  </Text>
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
                  activeOpacity={0.7}
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
                activeOpacity={0.7}
                style={[GlobalStyles.darkBtn, { paddingHorizontal: 20 }, canGoNext() ? "" : GlobalStyles.disabledBtn]}
                disabled={canGoNext() ? false : true}
              >
                <Text style={[GlobalStyles.text, { color: "#fff" }]}>{screenNumber == 3 ? "Завершить" : "Далее"}</Text>
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
