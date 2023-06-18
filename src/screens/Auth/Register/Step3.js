import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomTextInput from "src/components/CustomTextInput";
import { GlobalStyles } from "src/theme/styles";

const Step3 = ({ vendorData, setVendorData }) => {

  const [confirmPass, setConfirmPass] = useState('')

  function emailHandler(text) {
    setVendorData({...vendorData, email: text})
  }
  function passwordHandler(text) {
    setVendorData({...vendorData, password: text})
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
      />

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 20 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#dadada" }} />
      </View>

      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Придумайте пароль</Text>
      <CustomTextInput
        length={50}
        placeholder={"Введите Ваш email"}
        marginBottom={10}
        value={vendorData.password}
        setter={passwordHandler}
      />
      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Введите пароль еще раз</Text>
      <CustomTextInput
        length={50}
        placeholder={"Введите Ваш email"}
        marginBottom={10}
        value={confirmPass}
        setter={setConfirmPass}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Step3;
