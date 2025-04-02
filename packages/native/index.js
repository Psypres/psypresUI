import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

export const HelloNative = () => (
  <TouchableOpacity onPress={() => alert('Hello from React Native!')}>
    <Text>Hello from Native!</Text>
  </TouchableOpacity>
);
