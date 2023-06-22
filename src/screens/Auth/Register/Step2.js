import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Alert } from "react-native";
import { GlobalStyles } from "../../../theme/styles";
import CustomTextInput from "../../../components/CustomTextInput";
import PhoneInput from "react-native-phone-number-input";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import Modal from "react-native-modal";
import { colors } from "src/theme/colors";
import { serverRequest } from "src/helpers/serverRequests";
import { useSelector } from "react-redux";
import CustomPhoneInput from "src/components/CustomPhoneInput";

const Step2 = ({ vendorData, setVendorData, phoneVerified, setPhoneVerified }) => {
  const [code, setCode] = useState("");
  const ref = useBlurOnFulfill({ code, cellCount: 4 });
  const [codeSent, setCodeSent] = useState(false);
  const [codeChecking, setCodeChecking] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const [secondsLeft, setSecondsLeft] = useState("30");
  const [modalVisible, setModalVisible] = useState(false);

  let serverUrl = useSelector((state) => state.settings.serverUrl);

  useEffect(() => {
    if (code.length == 4) {
      // something when code written
      checkCodeHandler();
      setCodeChecking(true);
    }
  }, [code]);

  function vendorNameHanlder(text) {
    setVendorData({ ...vendorData, vendorName: text });
  }

  function vendorPhoneHandler(text) {
    setVendorData({ ...vendorData, phone: text });
  }

  useEffect(() => {
    if (codeSent) {
      let remainingSeconds = 30;

      const countdownInterval = setInterval(() => {
        if (remainingSeconds > 0) {
          remainingSeconds--;
          if (remainingSeconds < 10) {
            setSecondsLeft(`0${remainingSeconds}`);
          } else {
            setSecondsLeft(`${remainingSeconds}`);
          }
        } else {
          setCodeSent(false);
          console.log("Время истекло!");
          clearInterval(countdownInterval);
        }
      }, 1000);
    }
  }, [codeSent]);

  useEffect(() => {
    console.log(secondsLeft);
  }, [secondsLeft]);

  async function sendCodeHandler() {
    let formData = new FormData();
    formData.append('phone', vendorData.phone)
    let response = await serverRequest(serverUrl, "/vendor/sendCode", "POST", formData);
    if (response.success) {
      setCodeSent(true);
      setModalVisible(true);
      Keyboard.dismiss();
      console.log(vendorData.phone);
    }

    // send code action
  }

  async function checkCodeHandler() {
    let formData = new FormData();
    formData.append('phone', vendorData.phone)
    formData.append('code', code)
    let response = await serverRequest(serverUrl, "/vendor/checkCode", "POST", formData);
    if (response.success) {
      setPhoneVerified(true);
      setModalVisible(false);
      setCodeChecking(false);
      setSecondsLeft('');
      setCodeSent(true);
    } else {
      Alert.alert('Ошибка', response.error)
      setCodeChecking(false)
    }
  }

  return (
    <View>
      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Как Вас зовут?</Text>
      <CustomTextInput
        length={30}
        refs={{placeholder: 'text'}}
        marginBottom={10}
        value={vendorData.vendorName}
        setter={vendorNameHanlder}
      />

      <Text style={[GlobalStyles.text, { marginBottom: 5 }]}>Ваш номер телефона</Text>
      <CustomPhoneInput
        value={vendorData.phone}
        setter={vendorPhoneHandler}
      />

      <TouchableOpacity
        style={[GlobalStyles.darkBtn, codeSent || vendorData.phone.length < 10 || phoneVerified ? GlobalStyles.disabledBtn : "", { marginBottom: 10 }]}
        disabled={codeSent || vendorData.phone.length < 10 || phoneVerified ? true : false}
        activeOpacity={0.7}
        onPress={() => {
          sendCodeHandler();
        }}
      >
        <Text style={[GlobalStyles.text, { color: "#fff" }]}>{!codeSent || phoneVerified ? "Отправить смс" : `00:${secondsLeft}`}</Text>
      </TouchableOpacity>

      {codeSent && !phoneVerified ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={[GlobalStyles.text, { textAlign: "center" }]}>Ввести код</Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}

      {phoneVerified ? <Text style={[GlobalStyles.text, { textAlign: "center", color: '#5cb85c' }]}>Телефон подтвержден ✅</Text> : <View></View>}

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View>
          <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
            <Text style={[GlobalStyles.subtitle, { marginBottom: 20, textAlign: "center" }]}>Введите код</Text>
            {codeChecking ? (
              <View style={{ marginBottom: 20 }}>
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
