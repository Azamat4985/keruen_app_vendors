import "react-native-gesture-handler";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import store from "./src/store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingScreen from "./src/screens/LoadingScreen";
import * as Font from "expo-font";
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "firebaseConfig";
import { child, get, getDatabase, ref } from "firebase/database";
import AuthNavigation from "src/navigation/AuthNavigation";

const Stack = createStackNavigator();
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const contentWidth = deviceWidth - deviceWidth * 0.1;

const fonts = () =>
  Font.loadAsync({
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("./assets/fonts/Rubik-ExtraBold.ttf"),
  });

export default function App() {
  const [fontsReady, setFontsReady] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    fonts().then(() => {
      setFontsReady(true);
    });
  }, []);

  if (appReady && fontsReady) {
    if (!logged) {
      return (
        <Provider store={store}>
          <AuthNavigation contentWidth={contentWidth}/>
        </Provider>
      );
    }
  } else {
    return (
      <Provider store={store}>
        <LoadingScreen setAppReady={setAppReady} setLogged={setLogged}/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
});
