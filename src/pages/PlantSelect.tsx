import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function PlantSelect() {

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header />

          <Text style={styles.title}>Em qual ambiente</Text>
          <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
          <View>
            <FlatList
              data={[0,1,2,3,4]}
              renderItem={() =>
                <EnvironmentButton title="Sala" active/>
              }
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.environmentList}
            />
            
            
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 32
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 16
  },
  subtitle: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 4,
    marginVertical: 32
  }
})