import React from "react";
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../../theme/styles";
import CustomTextInput from "../../../components/CustomTextInput";

const Step1 = ({ vendorData, setVendorData }) => {
  function nameHandler(text) {
    setVendorData({ ...vendorData, name: text });
  }

  function descriptionHandler(text) {
    setVendorData({ ...vendorData, description: text });
  }

  return (
    <View>
      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Название магазина</Text>
      <CustomTextInput placeholder={"Введите название магазина"} length={50} marginBottom={20} value={vendorData.name} setter={nameHandler} />

      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Описание магазина</Text>
      <CustomTextInput placeholder={"Введите описание магазина"} length={150} marginBottom={30} multiline={true} value={vendorData.description} setter={descriptionHandler} />

      <Text style={[GlobalStyles.text, { marginBottom: 20 }]}>Предпросмотр</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={.7}>
          <View style={{ position: "relative" }}>
            <Image source={require("../../../../assets/default_avatar.jpg")} style={{ width: 100, height: 100, resizeMode: "cover", borderRadius: 100 }} />
            <View style={{ position: "absolute", width: 100, height: 100, top: 0, left: 0, backgroundColor: "rgba(0,0,0, 0.4)", borderRadius: 100, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Image source={require("../../../../assets/img_icon.png")} style={{ width: 50, height: 50, resizeMode: "contain", opacity: 0.8 }} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ marginStart: 15, flex: 1 }}>
          <Text style={[GlobalStyles.text, { fontFamily: "Rubik-Medium", fontSize: 22, marginBottom: 5 }]}>{vendorData.name == '' ? 'Название магазина' : vendorData.name}</Text>
          <Text style={[GlobalStyles.text, { flexShrink: 1, fontSize: 16 }]}>{vendorData.description == '' ? 'Описание магазина' : vendorData.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Step1;
