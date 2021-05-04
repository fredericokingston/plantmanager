import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import { Header } from '../components/Header';

import colors from '../styles/colors';

export function MyPlants() {
  return (
    <View style={styles.container}>
      <Header />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 50,
    backgroundColor: colors.background
  }
});