import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { RootStackParamList } from '../navigation';
import { Base64 } from '../lib/base64';
import { useSelector, useDispatch } from 'react-redux'
import { setDevice, } from '../store/actions/main'
import s from '../styles/style'


type DeviceCardProps = {
  device: Device;
};

const DeviceCard = ({ device }: DeviceCardProps) => {
  const dispatch = useDispatch()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // is the device connected?
    device.isConnected().then(setIsConnected);
  }, [device]);


  return (
    <TouchableOpacity
      style={s.deviceCard}
      // navigate to the Device Screen
      onPress={() => {
        dispatch(setDevice(device))
        navigation.navigate('Device')
      }}>
      <Text>{`Name : ${device.name}`}</Text>
      <Text>{`RSSI : ${device.rssi}`}</Text>
    </TouchableOpacity>
  );
};


export { DeviceCard };
