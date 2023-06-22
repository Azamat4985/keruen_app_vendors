import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, Platform, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, ActivityIndicator } from "react-native";
import { GlobalStyles } from "../../theme/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "src/helpers/validators";
import { serverRequest } from "src/helpers/serverRequests";
import { useDispatch, useSelector } from "react-redux";
import { changeLogged } from "src/store/reducers/accountReducer";
import { setToken } from "src/store/reducers/accountReducer";
import { setAccountData } from "src/store/reducers/accountReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ route }) => {
  const [isRegister, setIsRegister] = useState(false);
  const { bgValue, fontValue, contentWidth } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {}, [isRegister]);

  let serverUrl = useSelector((state) => state.settings.serverUrl);

  async function loginHandler() {
    if (validateEmail(email)) {
      setIsPending(true)
      let formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);
      let response = await serverRequest(serverUrl, "/vendor/login", "POST", formdata);
      setIsPending(false)
      if (response.success) {
        // success
        dispatch(changeLogged(true));
        dispatch(setToken(response.data.token));
        dispatch(setAccountData(response.data));

        await AsyncStorage.setItem('token', response.data.token)
      } else {
        Alert.alert("Ошибка", response.error);
      }
    } else {
      Alert.alert("Ошибка", "Введите корректный email");
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      // keyboardVerticalOffset={20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={[styles.wrapper, { backgroundColor: bgValue }]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[GlobalStyles.container, { flexDirection: "column", justifyContent: "space-between", height: "100%" }]}>
              <View style={{}}>
                <View style={GlobalStyles.flexCenter}>
                  <Image
                    source={require("../../../assets/logo.png")}
                    style={{ width: 200, height: 100, resizeMode: "contain", marginBottom: 40 }}
                  />
                </View>
                <Text style={[GlobalStyles.text, GlobalStyles.title, { textAlign: "center" }]}>Войти</Text>

                <TouchableOpacity
                  style={[GlobalStyles.darkBtn, { marginBottom: 10 }]}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="logo-apple"
                    size={20}
                    color={"#fff"}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={[GlobalStyles.text, { color: "#fff", marginBottom: 0 }]}>Войти с Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[GlobalStyles.lightBtn, { marginBottom: 10 }]}
                  activeOpacity={0.7}
                >
                  <Image
                    source={require("../../../assets/google_logo.png")}
                    style={{ width: 20, height: 20, resizeMode: "contain", marginRight: 10 }}
                  />
                  <Text style={[GlobalStyles.text]}>Войти с Google</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                  <View style={{ flex: 1, height: 1, backgroundColor: "#dadada" }} />
                  <View>
                    <Text style={[GlobalStyles.text, { textAlign: "center", width: 50, marginBottom: 0 }]}>или</Text>
                  </View>
                  <View style={{ flex: 1, height: 1, backgroundColor: "#dadada" }} />
                </View>

                <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Email</Text>
                <TextInput
                  style={[GlobalStyles.textInput, { marginBottom: 15 }]}
                  placeholder="Введите ваш email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                />
                <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Пароль</Text>
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={[GlobalStyles.textInput, { marginBottom: 0 }]}
                    secureTextEntry={passwordHidden}
                    autoCapitalize="none"
                    placeholder="Введите ваш пароль"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                  />
                  <View style={{ position: "absolute", right: 15, flexDirection: "column", justifyContent: "center", height: "100%" }}>
                    {passwordHidden ? (
                      <Ionicons
                        name="eye"
                        size={24}
                        onPress={() => {
                          setPasswordHidden(false);
                        }}
                      />
                    ) : (
                      <Ionicons
                        name="eye-off"
                        size={24}
                        onPress={() => {
                          setPasswordHidden(true);
                        }}
                      />
                    )}
                  </View>
                </View>

                {!isPending ? (
                  <TouchableOpacity
                    style={[GlobalStyles.darkBtn, { marginTop: 20, marginBottom: 10 }]}
                    activeOpacity={0.7}
                    onPress={loginHandler}
                  >
                    <Text style={[GlobalStyles.text, { color: "#fff", fontFamily: "Rubik-Bold" }]}>Войти</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[GlobalStyles.darkBtn, GlobalStyles.disabledBtn, { marginTop: 20, marginBottom: 10 }]}
                    activeOpacity={0.7}
                    onPress={loginHandler}
                    disabled
                  >
                    <ActivityIndicator />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    //
                  }}
                >
                  <Text style={[GlobalStyles.smallText, { textAlign: "right", textDecorationLine: "underline" }]}>Забыли пароль?</Text>
                </TouchableOpacity>
              </View>

              {/* not acc */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text style={[GlobalStyles.text, { textAlign: "center", textDecorationLine: "underline" }]}>Нет учетной записи?</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    height: "100%",
  },
});

export default LoginScreen;
