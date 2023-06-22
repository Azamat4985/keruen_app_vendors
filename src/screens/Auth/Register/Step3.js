import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomTextInput from "src/components/CustomTextInput";
import { GlobalStyles } from "src/theme/styles";

const Step3 = ({ vendorData, setVendorData }) => {


  function emailHandler(text) {
    setVendorData({...vendorData, email: text})
  }
  function passwordHandler(text) {
    setVendorData({...vendorData, password: text})
  }
  function confirmPasswordHandler(text){
    setVendorData({...vendorData, confirmPassword: text})
  }

  return (
    <View>
      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Ваша эл. почта</Text>
      <CustomTextInput
        length={50}
        placeholder={"Введите Ваш email"}
        marginBottom={10}
        value={vendorData.email}
        setter={emailHandler}
        keyboardType='email-address'
        rule="email"
        failText="Email не корректен"
        capitalize={false}
      />

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 20 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#dadada" }} />
      </View>

      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Придумайте пароль</Text>
      <CustomTextInput
        length={50}
        placeholder={"Введите пароль"}
        marginBottom={10}
        value={vendorData.password}
        setter={passwordHandler}
        rule='password'
        failText='Пароль должен состоять из 8 символов и иметь минимум 1 цифру'
        capitalize={false}
      />
      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Введите пароль еще раз</Text>
      <CustomTextInput
        length={50}
        placeholder={"Введите пароль еще раз"}
        marginBottom={10}
        value={vendorData.confirmPassword}
        setter={confirmPasswordHandler}
        rule='confirmPassword'
        vendorData={vendorData}
        failText='Пароли не совпадают'
        capitalize={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Step3;
