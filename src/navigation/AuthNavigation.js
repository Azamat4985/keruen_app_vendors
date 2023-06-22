import React from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useSelector } from "react-redux";
import { NativeBaseProvider } from "native-base";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import RegisterScreen from "src/screens/Auth/Register/RegisterScreen";
import LoginScreen from "src/screens/Auth/LoginScreen";
import SelectScreen from "src/screens/SelectScreen";

const Stack = createStackNavigator();

const AuthNavigation = ({ contentWidth, setLogged }) => {
  return (
    <NativeBaseProvider>
      <ActionSheetProvider>
        <View style={[styles.container, { backgroundColor: "#fff" }]}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                initialParams={{ contentWidth: contentWidth, bgValue: "#fff", setLogged: setLogged }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                initialParams={{ contentWidth: contentWidth, bgValue: "#fff", setLogged: setLogged }}
              />
              <Stack.Screen
                name="Select"
                component={SelectScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ActionSheetProvider>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%'
  },
});

export default AuthNavigation;
