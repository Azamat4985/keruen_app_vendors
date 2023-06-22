import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { changeLogged, setAccountData } from "../store/reducers/accountReducer";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "src/theme/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serverRequest } from "src/helpers/serverRequests";

const HomeScreen = ({ route }) => {
  const dispatch = useDispatch();

  let serverUrl = useSelector(state => state.settings.serverUrl)
  let email = useSelector(state => state.account.accountData)

  async function logout(){
    dispatch(changeLogged(false));
    dispatch(setAccountData(null));
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('accountData');

    let formData = new FormData();
    formData.append('email', email.email)
    let response = await serverRequest(serverUrl, '/vendor/logout', 'POST', formData);
  }

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={logout}>
        <Text style={[GlobalStyles.text]}>log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
