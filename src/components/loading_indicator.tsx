import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {kFontFamily} from '../constants';

export default function LoadingIndicator() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <ActivityIndicator size={36} />
      <Text
        style={{fontFamily: kFontFamily, fontSize: 16, fontStyle: 'italic'}}>
        Loading, Please wait..
      </Text>
    </View>
  );
}
