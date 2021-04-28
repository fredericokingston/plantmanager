import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header'
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
  key: string;
  title: string;
}
interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelect() {
  const [enviroments, setEnvironments] = useState<EnvironmentProps[]>([])
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all')

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === 'all')
      return setFilteredPlants(plants);

    const filtered = plants.filter(plant =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api
      .get('plants_environments?_sort=title&_order=asc')
      setEnvironments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ]);
    }

    fetchEnvironment();

  }, [])

  useEffect(() => {
    async function fetchPlants() {
      const { data } = await api.get('plants?_sort=name&_order=asc')
      setPlants(data);
    }

    fetchPlants();

  }, [])

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header />
          <Text style={styles.title}>Em qual ambiente</Text>
          <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
        </View>
        <View >
          <FlatList
            data={enviroments}
            renderItem={({item}) =>
              <EnvironmentButton
                title={item.title}
                active={item.key === environmentSelected}
                onPress={() => handleEnvironmentSelected(item.key)}
              />
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.environmentList}
          />
        </View>

        <View style={styles.plantList}>
          <FlatList
            data={filteredPlants}
            renderItem={({ item }) => (
              <PlantCardPrimary
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 8
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
    paddingBottom: 5,
    marginVertical: 24,
    marginLeft: 32,
    paddingRight: 32
  },
  plantList: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center'
  }
})