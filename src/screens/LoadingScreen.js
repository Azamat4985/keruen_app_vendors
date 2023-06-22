import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref } from "firebase/database";
import { firebaseConfig } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { serverRequest } from "src/helpers/serverRequests";
import { checkTokenServer } from "src/helpers/serverRequests";
import { changeLogged } from "src/store/reducers/accountReducer";
import { setAccountData } from "src/store/reducers/accountReducer";
import { setToken } from "src/store/reducers/accountReducer";
import { setWsurl } from "src/store/reducers/settingsReducer";
import { setServerUrl } from "src/store/reducers/settingsReducer";

// Надо добавить анимацию
const LoadingScreen = ({ setAppReady }) => {
  let serverUrl = "";
  const app = initializeApp(firebaseConfig);
  const database = getDatabase();
  const dispatch = useDispatch();
  const [serverAvailable, setServerAvailable] = useState(false);

  async function checkAvailable(url) {
    let availableResponse = await serverRequest(serverUrl, "/service/isAvailable", "get");
    if (availableResponse) {
      if (availableResponse.success) {
        dispatch(setServerUrl(serverUrl));
        dispatch(setWsurl(availableResponse.wsUrl));
        return true;
      }
    } else {
      return false;
    }
  }

  async function getServerUrl() {
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `server_url`))
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          serverUrl = snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function checkToken() {
    let token = await AsyncStorage.getItem("token");
    if (token != null) {
      let tokenResult = await checkTokenServer(serverUrl, token);
      console.log(tokenResult);
      if (tokenResult.success) {
        dispatch(setToken(token));
        dispatch(changeLogged(true));
        dispatch(setAccountData(tokenResult.data));
        setTimeout(() => {
          setAppReady(true);
        }, 1000);
      } else if (!tokenResult.success) {
        Alert.alert("Ошибка", tokenResult.data.error);
      }
    } else {
      dispatch(changeLogged(false));
      setAppReady(true);
    }
  }

  useEffect(() => {
    async function loadSystem() {
      if (serverUrl == "") {
        await getServerUrl();
      }
      let isAvailable = await checkAvailable(serverUrl);
      if (isAvailable) {
        checkToken();
      } else {
        Alert.alert("Ошибка", "Соединение с сервером потеряно", [
          {
            text: "Попробовать еще раз",
            onPress: () => {
              loadSystem();
            },
            style: "default",
          },
        ]);
      }
    }
    loadSystem();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 200, resizeMode: "contain" }}
      />
      <ActivityIndicator size={"large"} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default LoadingScreen;
