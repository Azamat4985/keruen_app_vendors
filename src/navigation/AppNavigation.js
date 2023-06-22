import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
      <ActionSheetProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} initialParams={{}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ActionSheetProvider>
    );
};

const styles = StyleSheet.create({});

export default AppNavigation;
