import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { changeLogged } from "../store/reducers/accountReducer";

const HomeScreen = () => {
  const count = useSelector((state) => state.account.isLogged);
  console.log(count);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={(() => {dispatch(changeLogged(true))})}>
        <Text>Logged</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
