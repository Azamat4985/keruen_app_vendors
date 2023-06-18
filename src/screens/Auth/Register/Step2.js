import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, ActivityIndicator } from "react-native";
import { GlobalStyles } from "../../../theme/styles";
import CustomTextInput from "../../../components/CustomTextInput";
import PhoneInput from "react-native-phone-number-input";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import Modal from "react-native-modal";
import { colors } from "src/theme/colors";

const Step2 = ({ vendorData, setVendorData, phoneVerified, setPhoneVerified }) => {
  const [code, setCode] = useState("");
  const ref = useBlurOnFulfill({ code, cellCount: 4 });
  const [codeSent, setCodeSent] = useState(false);
  const [codeChecking, setCodeChecking] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });

  useEffect(() => {
    if (code.length == 4) {
      // something when code written
      setCodeChecking(true);
    }
  }, [code]);

  function vendorNameHanlder(text) {
    setVendorData({ ...vendorData, vendorName: text });
  }

  function vendorPhoneHandler(text) {
    setVendorData({ ...vendorData, phone: text });
  }

  function sendCodeHandler() {
    setCodeSent(true);
    Keyboard.dismiss();
    // send code action
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
      <PhoneInput
        defaultCode="KZ"
        textInputProps={{ keyboardType: "number-pad", placeholder: "Ваш номер телефона", maxLength: 10 }}
        disableArrowIcon
        onChangeText={(text) => {
          vendorPhoneHandler(text);
        }}
        containerStyle={{ marginBottom: 20 }}
      />

      <TouchableOpacity
        style={[GlobalStyles.darkBtn, codeSent || vendorData.phone.length != 10 ? GlobalStyles.disabledBtn : "", { marginBottom: 10 }]}
        disabled={codeSent || vendorData.phone.length != 10 ? true : false}
        activeOpacity={0.7}
        onPress={() => {
          sendCodeHandler();
        }}
      >
        <Text style={[GlobalStyles.text, { color: "#fff" }]}>Отправить смс</Text>
      </TouchableOpacity>

      <Modal
        isVisible={codeSent}
        onBackdropPress={() => setCodeSent(false)}
      >
        <View>
          <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
            <Text style={[GlobalStyles.subtitle, { marginBottom: 20, textAlign: "center" }]}>Введите код</Text>
            <Text style={[GlobalStyles.text, {color: colors.danger, marginBottom: 20, textAlign: 'center'}]}>sdfsd</Text>
            {codeChecking ? (
              <View style={{marginBottom: 20}}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <CodeField
                ref={ref}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={code}
                onChangeText={setCode}
                cellCount={4}
                rootStyle={{ flexDirection: "row", alignContent: "center", justifyContent: "space-between", width: "100%", marginBottom: 20 }}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[GlobalStyles.codeInput, isFocused && GlobalStyles.codeFocus]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            )}

            <TouchableOpacity>
              <Text style={[GlobalStyles.text, { textAlign: "center" }]}>Отправить код еще раз</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Step2;
