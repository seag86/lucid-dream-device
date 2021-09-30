import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  Image,
  View,
  PermissionsAndroid
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { addDevice, clear, } from '../store/actions/device'
import {
  setDevice,
  setRateTreshold,
  setBleName,
  setAutoConnect,
  setBrakeTime,
  setRepeatInterval,
  setRepeatCount,
  setBlinkCount,
} from '../store/actions/main'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DeviceCard } from '../components/DeviceCard';
import { BleManager, Device } from 'react-native-ble-plx';
import Torch from 'react-native-torch';

import s from '../styles/style'
import { TouchableOpacity } from 'react-native-gesture-handler';

const manager = new BleManager();


const HomeScreen = ({
  route,
  navigation
}: StackScreenProps<RootStackParamList>) => {

  const dispatch = useDispatch()

  const scannedDevices = useSelector(store => store.devices)
  const { defaultBleName, autoConnect } = useSelector(store => store.main)

  // state to give the user a feedback about the manager scanning devices
  const [isLoading, setIsLoading] = useState(false);


  const scanDevices = (autocnct) => {
    // display the Activityindicator
    setIsLoading(true);

    // scan devices
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }

      // if a device is detected add the device to the list by dispatching the action into the reducer
      if (scannedDevice) {
        dispatch(addDevice(scannedDevice));
      }

      if (autocnct && scannedDevice && scannedDevice.name == defaultBleName) {
        manager.stopDeviceScan();
        setIsLoading(false);
        console.log(defaultBleName, `found`, scannedDevice.id)
        dispatch(setDevice(scannedDevice))
        setTimeout(() => navigation.navigate('Device'), 3000)
      }
    });

    //stop scanning devices after 5 seconds
    setTimeout(() => {
      manager.stopDeviceScan();
      setIsLoading(false);
    }, 5000);
  };


  const ListHeaderComponent = () => (
    <View style={s.body}>
      <View style={[s.flexRow, s.spaceBtw, s.aCenter]}>
        <Text style={s.sectionTitle}>Devices</Text>
        <TouchableOpacity
          style={[s.settingsBtn, s.flexRow, s.spaceBtw, s.btn60, s.center]}
          onPress={() => navigation.navigate('Settings')}
        >
          <Image
            style={[s.image24]}
            source={require('../assets/images/settings.png')}
          />

        </TouchableOpacity>
      </View>
      <View style={s.sectionContainer}>
        <Button
          title="Clear devices"
          onPress={() => dispatch(clear())}
        />
        {isLoading ? (
          <View style={s.activityIndicatorContainer}>
            <ActivityIndicator color={'teal'} size={25} />
          </View>
        ) : (
          <View style={s.pv10}>
            <Button title="Scan devices" onPress={() => scanDevices(autoConnect)} />
          </View>
        )}
      </View>
    </View>
  );

  useEffect(() => {
    // BLE permissions
    let requestPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Dream App',
            'message': 'Dream App access to your location for BLE'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use BLE")
        } else {
          console.log("location permission denied")
        }
      } catch (err) {
        console.warn(err)
      }

      // Torch
      try {
        const cameraAllowed = await Torch.requestCameraPermission(
          'Camera Permissions', // dialog title
          'We require camera permissions to use the torch on the back of your phone.' // dialog body
        );
        if (cameraAllowed) {
          console.log("Torch allowed")
        } else {
          console.log("Using torch denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }
    requestPermission()

    // Load settings
    const loadSettings = async () => {
      try {
        const result = await AsyncStorage.getItem('@rate')
        const rate = Number(result)
        if (rate > 20 && rate < 150) dispatch(setRateTreshold(Number(result)))
        else dispatch(setRateTreshold(70))

        const result2 = await AsyncStorage.getItem('@brake')
        let brake = result2 ? Number(result2) : 10
        dispatch(setBrakeTime(Number(brake)))

        const result3 = await AsyncStorage.getItem('@blename')
        dispatch(setBleName(result3))

        const result4 = await AsyncStorage.getItem('@autoconnect')
        const autocn = result4 == 'true'
        dispatch(setAutoConnect(autocn))

        const result5 = await AsyncStorage.getItem('@repeattime')
        const repeattime = result5 ? result5 : 8
        dispatch(setRepeatInterval(repeattime))

        const result6 = await AsyncStorage.getItem('@repeatcount')
        const repeatcount = result6 ? result6 : 5
        dispatch(setRepeatCount(repeatcount))

        const result7 = await AsyncStorage.getItem('@blinkcount')
        const blinkcount = result7 ? result7 : 5
        dispatch(setBlinkCount(blinkcount))

        // Initial scan
        scanDevices(autocn)
      } catch (e) {
        console.log(e)
      }
    }
    loadSettings()

    return () => {
      manager.destroy();
    };
  }, []);




  return (
    <SafeAreaView style={s.body}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={scannedDevices}
        renderItem={({ item }) => <DeviceCard device={item} />}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={s.content}
      />
    </SafeAreaView>
  );
};


export { HomeScreen };
