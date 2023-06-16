import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, Dimensions, Platform, Image, TextInput, Touchable, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { GlobalStyles } from "../../theme/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = ({ route }) => {
  const [isRegister, setIsRegister] = useState(false);
  const { bgValue, fontValue, contentWidth } = route.params;
  const navigation = useNavigation();

  useEffect(() => {}, [isRegister]);

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: bgValue }]}>
      <View style={GlobalStyles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="padding">
            <View style={GlobalStyles.flexCenter}>
              <Image source={require("../../../assets/logo.png")} style={{ width: 200, height: 100, resizeMode: "contain", marginBottom: 40 }} />
            </View>
            <View>
              <Text style={[GlobalStyles.text, GlobalStyles.title, { textAlign: "center" }]}>Войти</Text>

              <TouchableOpacity style={[GlobalStyles.darkBtn, { marginBottom: 10 }]} activeOpacity={0.7}>
                <Ionicons name="logo-apple" size={20} color={"#fff"} style={{ marginRight: 10 }} />
                <Text style={[GlobalStyles.text, { color: "#fff", marginBottom: 0 }]}>Войти с Apple</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[GlobalStyles.lightBtn, { marginBottom: 10 }]} activeOpacity={0.7}>
                <Image source={require("../../../assets/google_logo.png")} style={{ width: 20, height: 20, resizeMode: "contain", marginRight: 10 }} />
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
              <TextInput style={[GlobalStyles.textInput, { marginBottom: 15 }]} placeholder="Введите ваш email" />
              <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Пароль</Text>
              <TextInput style={GlobalStyles.textInput} placeholder="Введите ваш пароль" />
              <TouchableOpacity style={[GlobalStyles.darkBtn, { marginTop: 20, marginBottom: 10 }]} activeOpacity={0.7}>
                <Text style={[GlobalStyles.text, { color: "#fff", fontFamily: "Rubik-Bold" }]}>Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => {navigation.navigate('Register')}}>
                <Text style={[GlobalStyles.smallText, {textAlign: 'right', textDecorationLine: 'underline'}]}>Создать учетную запись</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default LoginScreen;
