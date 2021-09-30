import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Characteristic, Descriptor, Service } from 'react-native-ble-plx';
import { CharacteristicCard } from './CharacteristicCard';
import { DataParsing } from './DataParsing';
import { DescriptorCard } from './DescriptorCard';
import s from '../styles/style'

type ServiceCardProps = {
  service: Service;
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  const [descriptors, setDescriptors] = useState<Descriptor[]>([]);
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);
  const [areCharacteristicsVisible, setAreCharacteristicsVisible] = useState(
    true,
  );

  useEffect(() => {
    const getCharacteristics = async () => {
      const newCharacteristics = await service.characteristics();
      setCharacteristics(newCharacteristics);
      newCharacteristics.forEach(async (characteristic) => {
        const newDescriptors = await characteristic.descriptors();
        setDescriptors((prev) => [...new Set([...prev, ...newDescriptors])]);
      });
    };

    getCharacteristics();
  }, [service]);

  return (
    <View style={s.serviceCard}>
      {areCharacteristicsVisible &&
        characteristics &&
        characteristics.map((char) => (
          <DataParsing 
            key={char.id}
            char={char}
          />
        ))}
    </View>
  );
};

export { ServiceCard };
