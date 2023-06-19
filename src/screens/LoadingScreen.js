import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref } from "firebase/database";
import { firebaseConfig } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { checkTokenServer } from "src/helpers/serverRequests";
import { setToken } from "src/store/reducers/accountReducer";
import { setServerUrl } from "src/store/reducers/settingsReducer";

// Надо добавить анимацию
const LoadingScreen = ({ setAppReady, setLogged }) => {
  let serverUrl = "";
  const app = initializeApp(firebaseConfig);
  const database = getDatabase();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getServerUrl() {
      const dbRef = ref(getDatabase());
      await get(child(dbRef, `server_url`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            serverUrl = snapshot.val();
            dispatch(setServerUrl(snapshot.val()))
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getServerUrl().then(() => {
      async function checkToken() {
        await AsyncStorage.setItem("token", "testToken");
        let token = await AsyncStorage.getItem("token");
        if (token) {
          let tokenResult = await checkTokenServer(serverUrl, token);
          if (tokenResult.result) {
            if (tokenResult.data.success) {
              dispatch(setToken(token));
              setLogged(true);
              setAppReady(true);
            } else {
              setLogged(false);
              setAppReady(true);
            }
          } else if(!tokenResult.result) {
            Alert.alert('Ошибка', tokenResult.msg)
          }
        } else {
          setLogged(false);
        }
      }
      checkToken();
    });
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
