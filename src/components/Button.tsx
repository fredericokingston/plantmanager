import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  text: string
}

export function Button({ text, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      {...rest}
    >
      <Text style={styles.text}>
      {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    backgroundColor: colors.green,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: fonts.heading,
    fontSize: 17,
    textAlign: 'center',
    color: colors.white
  }
})