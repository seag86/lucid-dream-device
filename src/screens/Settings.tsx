import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  setRateTreshold,
  setAutoConnect,
  setBleName,
  setFirstDelay,
  setBrakeTime,
  setRepeatInterval,
  setRepeatCount,
  setBlinkCount,
  setDefaults,
} from '../store/actions/main'
import {
  Text, ScrollView, Button, View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialState } from '../store/reducers/main';

import { RootStackParamList } from '../navigation/index';
import s from '../styles/style';

let ios = Platform.OS === 'ios' ? true : false



const Settings = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList>) => {

  const dispatch = useDispatch()

  const [beat, setBeat] = useState(true);
  const { firstDelay, breakTime, rateTreshold, repeatTime, repeatCount, defaultBleName, autoConnect, blinkCount } = useSelector(state => state.main)


  useEffect(() => {

  }, []);

  const saveRate = async () => {
    try {
      await AsyncStorage.setItem('@rate', String(rateTreshold))
    } catch (e) {
      console.log('error saving')
    }
  }
  const saveBrakeTime = async () => {
    try {
      await AsyncStorage.setItem('@brake', String(breakTime))
    } catch (e) {
      console.log('error saving')
    }
  }
  const saveBleName = async () => {
    try {
      await AsyncStorage.setItem('@blename', defaultBleName)
    } catch (e) {
      console.log('error saving')
    }
  }

  const saveAuto = async (val) => {
    try {
      dispatch(setAutoConnect(val))
      await AsyncStorage.setItem('@autoconnect', String(val))
    } catch (e) {
      console.log('error saving')
    }
  }

  const saveRepeatTime = async () => {
    try {
      const valid = repeatTime > 0 && repeatTime < 100 ? repeatTime : 8
      await AsyncStorage.setItem('@repeattime', String(valid))
    } catch (e) {
      console.log('error saving')
    }
  }

  const saveRepeatCount = async () => {
    try {
      const valid = repeatCount > 0 && repeatCount < 20 ? repeatCount : 5
      await AsyncStorage.setItem('@repeatcount', String(valid))
    } catch (e) {
      console.log('error saving')
    }
  }

  const saveBlinkCount = async () => {
    try {
      const valid = blinkCount > 0 && blinkCount < 20 ? blinkCount : 5
      await AsyncStorage.setItem('@blinkcount', String(valid))
    } catch (e) {
      console.log('error saving')
    }
  }

  const saveFirstDelay = async () => {
    try {
      const valid = firstDelay > breakTime && firstDelay < 720 ? firstDelay : 60
      await AsyncStorage.setItem('@firstdelay', String(valid))
    } catch (e) {
      console.log('error saving')
    }
  }

  const defaults = async () => {
    dispatch(setDefaults())
      try {
        await AsyncStorage.setItem('@rate', String(initialState.rateTreshold))
        await AsyncStorage.setItem('@brake', String(initialState.breakTime))
        await AsyncStorage.setItem('@blename', initialState.defaultBleName)
        await AsyncStorage.setItem('@autoconnect', String(initialState.autoConnect))
        await AsyncStorage.setItem('@repeattime', String(initialState.repeatTime))
        await AsyncStorage.setItem('@repeatcount', String(initialState.repeatCount))
        await AsyncStorage.setItem('@blinkcount', String(initialState.blinkCount))
        await AsyncStorage.setItem('@firstdelay', String(initialState.firstDelay))
      } catch (e) {
        console.log('error saving')
      }
  }


  return (
    <View style={[s.container]} >
      <KeyboardAvoidingView
        style={[]}
        behavior={ios ? "padding" : "height"}
      >
        <ScrollView >

          <Text style={[s.text18, s.mt15, s.mh15]}>General</Text>
          <View style={[s.hLine, s.mh15]} />

          <Text style={[s.mt15, s.mh15]}>Beats per minute treshold for flash trigger</Text>
          <TextInput
            style={[s.mh15, s.ph10, s.tInput, s.aCenter]}
            keyboardType="numeric"
            onChangeText={(txt) => dispatch(setRateTreshold(Number(txt.replace(/[^0-9]/g, ""))))}
            value={String(rateTreshold)}
            onBlur={saveRate}
          />
          <View style={[s.hLine, s.mh15]} />

          <Text style={[s.mt15, s.mh15]}>Default bluetooth name</Text>
          <TextInput
            style={[s.mh15, s.ph10, s.tInput, s.aCenter]}
            //keyboardType="numeric"
            onChangeText={(txt) => dispatch(setBleName(txt.replace(/[^A-Za-z-_]/g, "")))}
            value={String(defaultBleName)}
            onBlur={saveBleName}
          />
          <View style={[s.hLine, s.mh15]} />

          <View style={[s.flexRow, s.spaceBtw, s.aCenter]}>
            <Text style={[s.mh15]}>Auto connect to ble if available</Text>
            <CheckBox
              value={autoConnect}
              onValueChange={(val) => {
                saveAuto(val)
              }}
              style={[s.checkbox, s.mh10]}
            />
          </View>
          <View style={[s.hLine, s.mh15]} />

          <Text style={[s.text18, s.mt15, s.mh15]}>Flash settings</Text>
          <View style={[s.hLine, s.mh15]} />

          <Text style={[s.mt15, s.mh15]}>Delay before first trigger, min.</Text>
          <TextInput
            style={[s.mh15, s.ph10, s.tInput, s.aCenter]}
            keyboardType="numeric"
            onChangeText={(txt) => dispatch(setFirstDelay(Number(txt.replace(/[^0-9]/g, ""))))}
            value={String(firstDelay)}
            onBlur={saveFirstDelay}
          />
          <View style={[s.hLine, s.mh15]} />

          <Text style={[s.mt15, s.mh15]}>Break time limit between flash trigger, min.</Text>
          <TextInput
            style={[s.mh15, s.ph10, s.tInput, s.aCenter]}
            keyboardType="numeric"
            onChangeText={(txt) => dispatch(setBrakeTime(Number(txt.replace(/[^0-9]/g, ""))))}
            value={String(breakTime)}
            onBlur={saveBrakeTime}
          />
          <View style={[s.hLine, s.mh15]} />


          <Text style={[s.mt15, s.mh15]}>Blink count</Text>
          <TextInput
            style={[s.mh15, s.ph10, s.tInput, s.aCenter]}
            keyboardType="numeric"
            onChangeText={(txt) => dispatch(setBlinkCount(txt.replace(/[^0-9]/g, "")))}
            value={String(blinkCount)}
            onBlur={saveBlinkCount}
          />
          <View style={[s.hLine, s.mh15]} />


          <Text style={[s.mt15, s.mh15]}>Repeat interval, sec.</Text>
          <TextInput
            style={[s.mh15, s.ph10, s.tInput, s.aCenter]}
            keyboardType="numeric"
            onChangeText={(txt) => dispatch(setRepeatInterval(txt.replace(/[^0-9]/g, "")))}
            value={String(repeatTime)}
            onBlur={saveRepeatTime}
          />
          <View style={[s.hLine, s.mh15]} />

          <Text style={[s.mt15, s.mh15]}>Repeat count</Text>
          <TextInput
            style={[s.mh15, s.ph10, s.tInput, s.aCenter]}
            keyboardType="numeric"
            onChangeText={(txt) => dispatch(setRepeatCount(txt.replace(/[^0-9]/g, "")))}
            value={String(repeatCount)}
            onBlur={saveRepeatCount}
          />
          <View style={[s.hLine, s.mh15]} />

          <View style={[s.mh15, s.mt15, s.mb20]}>
            <Button
              title="defaults"
              onPress={defaults}
            />
          </View>




        </ScrollView>
      </KeyboardAvoidingView >
    </View >
  );
};



export { Settings };
