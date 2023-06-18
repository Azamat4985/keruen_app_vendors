import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Platform } from "react-native";
import { GlobalStyles } from "../theme/styles";

const CustomTextInput = ({ length, placeholder, setter, value, marginBottom, multiline, keyboardType }) => {

  const [currentLength, setCurrentLength] = useState(value ? value.length : 0);

  function changeHandler(text){
    setCurrentLength(text.length)
    setter(text);
  }
  
  if(multiline){
    return (
      <View style={{marginBottom: marginBottom}}>
      <TextInput multiline={multiline} style={[GlobalStyles.textInput, {marginBottom: 5, paddingTop: 15}]} placeholder={placeholder} onChangeText={changeHandler} maxLength={length} value={value}/>
      {length ? <Text style={{textAlign: 'right', color: '#5c5c5c'}}> {currentLength} / {length}</Text> : <View></View>}
    </View>
    )
  } else {
    return (
      <View style={{marginBottom: marginBottom}}>
        <TextInput keyboardType={keyboardType} style={[GlobalStyles.textInput, {marginBottom: 5}]} placeholder={placeholder} onChangeText={changeHandler} maxLength={length} value={value}/>
        {length ? <Text style={{textAlign: 'right', color: '#5c5c5c'}}> {currentLength} / {length}</Text> : <View></View>}
      </View>
    );
  }


};

const styles = StyleSheet.create({});

export default CustomTextInput;
