import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { GlobalStyles } from "../theme/styles";

const SelectScreen = ({ route }) => {
  const { title, data, type } = route.params;
  const navigation = useNavigation();

  navigation.setOptions({ title: title, headerShown: true, headerBackTitle: "Назад" });

  function selectHandler(value) {
    switch (type) {
      case "region":
        navigation.navigate("Register", { region: value });
        break;

      case "city":
        navigation.navigate("Register", { city: value });
        break;

      default:
        break;
    }
  }

  function SelectItem({ item }) {
    return (
      <View>
        <TouchableOpacity
          style={[GlobalStyles.optionItem, { marginBottom: 0 }]}
          onPress={() => selectHandler(item)}
        >
          <Text style={[GlobalStyles.text]}>{item}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, height: 1, backgroundColor: "#dadada" }} />
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 20, backgroundColor: "#fff", flex: 1 }}>
      <ScrollView>
        {data.map((item, index) => {
          return (
            <SelectItem
              item={item}
              key={index}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SelectScreen;
