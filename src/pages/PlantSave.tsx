import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg'
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns';

import { Button } from '../components/Button';
import { PlantProps, savePlant } from '../libs/storage';

import waterDropImg from '../assets/waterdrop.png'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')

  const route = useRoute();
  const { plant } = route.params as Params;
 
  const navigation = useNavigation();


  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldstate => !oldstate)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏱️')
    };

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDateTimaePickerAndroid() {
    setShowDatePicker(oldstate => !oldstate)
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonText: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      });
    } catch {
      Alert.alert('Não foi possível salvar. 😢')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri
          uri={plant.photo}
          height={160}
          width={160}
        />
        <Text style={styles.plantName}>
          {plant.name}
        </Text>
        <Text style={styles.plantAbout}>
          {plant.about}
        </Text>
      </View>
      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image
            source={waterDropImg}
            style={styles.tipImage}
          />
          <Text style={styles.tipText}>
            {plant.water_tips}
          </Text>
        </View>

        <View style={styles.datePickerContentainer}>
          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          { showDatePicker && (
              <DateTimePicker
                value={selectedDateTime}
                mode='time'
                display= 'spinner'
                onChange={handleChangeTime}
              />
            )}

            { Platform.OS === 'android' && (
                <TouchableOpacity
                  style={styles.dateTimePickerButton}
                  onPress={handleOpenDateTimaePickerAndroid}
                >
                  <Text style={styles.dateTimePickerText}>
                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                  </Text>
                </TouchableOpacity>
            )}
        </View>
        <Button
          text="Cadastrar planta"
          onPress={handleSave}
        />
      </View>
    </ View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    color: colors.heading,
    marginTop: 16
  },
  plantAbout: {
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'center',
    color: colors.body_dark,

    marginTop: 16
  },
  controller: {
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: getBottomSpace() || 18
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderRadius: 20,
    position: 'relative',
    bottom: 60,

    backgroundColor: colors.blue_light
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    fontFamily: fonts.text,
    marginLeft: 16,
    fontSize: 15,
    lineHeight: 23,
    color: colors.blue
  },
  datePickerContentainer:{
    width: '100%',
    paddingHorizontal: 46
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.body_dark,
    fontSize: 13,
    marginBottom: 6
  },
  dateTimePickerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: colors.shape,
    borderRadius: 10,
    marginBottom: 32
  },
  dateTimePickerText: {
    color: colors.body_dark,
    fontSize: 17,
    fontFamily: fonts.heading
  }
})