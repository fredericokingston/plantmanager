import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet
} from 'react-native';

import { Button } from '../components/Button'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  title: string;
  subtitle: string;
  buttonText: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😁'
}

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonText,
    icon,
    nextScreen
  } = routes.params as Params;

  function handleUse() {
    navigation.navigate(nextScreen)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
        {emojis[icon]}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

        <View style={styles.footer}>
          <Button
            text={buttonText}
            onPress={handleUse}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 54
  },
  emoji: {
    fontSize: 64,
    marginBottom: 64
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 30,
    color: colors.heading,
    textAlign: 'center'
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'center',
    marginTop: 16
  },
  footer: {
    width: '100%',
    marginTop: 40
  }
})