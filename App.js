import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import store from "./src/store/store";
import { Provider } from "react-redux";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import { useEffect, useState } from "react";
import LoadingScreen from "./src/screens/LoadingScreen";
import * as Font from "expo-font";
import RegisterScreen from "./src/screens/Auth/Register/RegisterScreen";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { NativeBaseProvider } from "native-base";
import SelectScreen from "./src/screens/SelectScreen";

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
  const [bgValue, setBgValue] = useState("#fff");
  const [fontValue, setFontValue] = useState("#fff");
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    fonts().then(() => {
      setFontsReady(true);
    });
  }, []);

  if (fontsReady) {
    return (
      <NativeBaseProvider>
        <ActionSheetProvider>
          <View style={[styles.container, { backgroundColor: bgValue }]}>
            <Provider store={store}>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    initialParams={{ contentWidth: contentWidth, bgValue: bgValue, fontValue: fontValue }}
                  />
                  <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    initialParams={{ contentWidth: contentWidth, bgValue: bgValue, fontValue: fontValue }}
                  />
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                  />
                  <Stack.Screen name="Select" component={SelectScreen}/>
                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
          </View>
        </ActionSheetProvider>
      </NativeBaseProvider>
    );
  } else {
    return <LoadingScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
