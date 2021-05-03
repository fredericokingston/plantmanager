import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImag from '../../assets/user.jpeg'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '');
    }

    loadStorageUserName();
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
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