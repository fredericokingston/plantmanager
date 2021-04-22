import React from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnvironmentButton({
  title,
  active= false,
  ...rest
}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.containerActive
      ]}
    >
      <Text 
        style={[
          styles.title,
          active && styles.titleActive
        ]}>
        {title}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 4
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  title:{
    color: colors.heading,
    fontFamily: fonts.text
  },
  titleActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading
  }
})