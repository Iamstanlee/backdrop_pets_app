import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {kFontFamily} from '../constants';

export default function Error({message}: {message: string}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <Text style={{fontFamily: kFontFamily, fontSize: 16}}>{message}</Text>
    </View>
  );
}
