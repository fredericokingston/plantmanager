import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import userImag from '../../assets/user.jpeg'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Fred</Text>
      </View>

      <Image
        source={userImag}
        style={styles.avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 16,
  marginTop: getStatusBarHeight()
  },
  avatar: {
    height: 56,
    width: 56,
    borderRadius: 56
  },
  greeting: {
    fontFamily: fonts.text,
    fontSize: 32,
    lineHeight: 36,
    color: colors.heading
  },
  userName: {
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 36,
    color: colors.heading
  }
})