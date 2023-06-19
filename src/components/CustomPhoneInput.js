import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { GlobalStyles } from 'src/theme/styles';

const CustomPhoneInput = ({value, setter}) => {



  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}}>
      <Text style={{fontSize: 30, paddingHorizontal: 20}}>🇰🇿</Text>
      <Text style={{paddingHorizontal: 20, backgroundColor: '#f8f9f9', textAlign: 'center', fontSize: 18, paddingVertical: 15}}>+7</Text>
      <MaskedTextInput mask='(999) 999 99 99' keyboardType='number-pad' onChangeText={setter} value={value} placeholder='Ваш номер телефона' style={{backgroundColor: '#F8F9F9', flexGrow: 1, paddingVertical: 15, paddingRight: 20, fontSize: 18}}/>
    </View>
  );
}

const styles = StyleSheet.create({})

export default CustomPhoneInput;
