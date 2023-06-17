import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { GlobalStyles } from "../../../theme/styles";
import CustomTextInput from "../../../components/CustomTextInput";
import PhoneInput from "react-native-phone-number-input";

const Step2 = ({ vendorData, setVendorData }) => {

  function vendorNameHanlder(text){
    setVendorData({...vendorData, vendorName: text})
  }

  return (
    <View>
      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Как Вас зовут?</Text>
      <CustomTextInput
        length={30}
        placeholder={"Введите Ваше имя"}
        marginBottom={10}
        value={vendorData.vendorName}
        setter={vendorNameHanlder}
      />
      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Ваш номер телефона</Text>
      <PhoneInput defaultCode="KZ" textInputProps={{keyboardType: 'number-pad', placeholder: "Ваш номер телефона"}} disableArrowIcon/>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Step2;
