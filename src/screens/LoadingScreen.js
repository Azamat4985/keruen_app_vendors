import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadingScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('../../assets/logo.png')} style={{width: 200, resizeMode: 'contain'}}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})

export default LoadingScreen;
