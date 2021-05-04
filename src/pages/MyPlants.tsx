import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList
} from 'react-native';
import { Header } from '../components/Header';

import waterDropImg from '../assets/waterdrop.png'

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantProps, loadPlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextWatered(
        `Regue sua ${plantsStoraged[0].name} daqui a ${nextTime}.`
      )

      setMyPlants(plantsStoraged);
      setLoading(false);
    }
    loadStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
          <Image
            source={waterDropImg}
            style={styles.spotlightImage}
          />
          <Text style={styles.spotlightText}>
            {nextWatered}
          </Text>
        </View>

        <View style={styles.plants}>
          <Text style={styles.plantsTitle}>
            Próximas regadas
          </Text>
          <FlatList
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecondary
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
          />
        </View>

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
  },
  spotlight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderRadius: 20,
    backgroundColor: colors.blue_light
  },
  spotlightImage: {
    width: 56,
    height: 56
  },
  spotlightText: {
    flex: 1,
    fontFamily: fonts.text,
    marginLeft: 16,
    fontSize: 15,
    lineHeight: 23,
    color: colors.blue
  },
  plants: {
    flex: 1,
    width:'100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 24
  }
});