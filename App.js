import "react-native-gesture-handler";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
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
import NetInfo from "@react-native-community/netinfo";
import AppNavigation from "src/navigation/AppNavigation";
import { KeyboardAvoidingView } from "native-base";

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

function AppWrapper() {
  const [fontsReady, setFontsReady] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const dispatch = useDispatch();

  const networkSubscribe = NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      console.log(state.isConnected);
      // setAppReady(false);le
    }
  });

  networkSubscribe();

  async function getData() {
    let token = await AsyncStorage.getItem("token");
    let accountData = JSON.parse(await AsyncStorage.getItem("accountData"));
    // console.log("getData, token", token);
    // console.log("getData, accountData", accountData);
  }

  useEffect(() => {
    fonts().then(() => {
      setFontsReady(true);
    });
    getData();
  }, []);

  let logged = useSelector((state) => state.account.isLogged);
  let wsUrl = useSelector((state) => state.settings.wsUrl);
  let myData = useSelector((state) => state.account.accountData);

  useEffect(() => {
    console.log("useEffect [logged]", logged);
  }, [logged]);
  let timer;

  useEffect(() => {
    if (wsUrl != "" && myData != null) {
      try {
        console.log("fired");
        let ws = new WebSocket(wsUrl);
        ws.onopen = () => {
          console.log("connected");

          ws.send(JSON.stringify({ cmd: "start", clientId: myData._id }));
        };
        ws.onmessage = (e) => {
          console.log(e.data);
        };
        ws.onclose = () => {
          Alert.alert("Ошибка", "Соединение с сервером потеряно", [
            {
              text: "Попробовать еще раз",
              onPress: () => {
                setAppReady(false);
              },
              style: "default",
            },
          ]);
          console.log("closed");
        };
      } catch (error) {
        console.log(error);
      }
    }
  }, [wsUrl, myData]);

  if (appReady && fontsReady) {
    if (!logged) {
      return <AuthNavigation contentWidth={contentWidth} />;
    } else {
      return <AppNavigation />;
    }
  } else {
    return <LoadingScreen setAppReady={setAppReady} />;
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

const styles = StyleSheet.create({});
