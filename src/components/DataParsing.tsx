import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { addData, addCurrent} from '../store/actions/rate'
import { Characteristic } from 'react-native-ble-plx';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Base64 } from '../lib/base64';
import base64 from 'react-native-base64';
import moment from 'moment';
import s from '../styles/style'

type CharacteristicCardProps = {
  char: Characteristic;
};

const decodeBleString = (value: string | undefined | null): string => {
  if (!value) {
    return '';
  }
  return Base64.decode(value);
};

const DataParsing = ( { char }: CharacteristicCardProps) => {

  const dispatch = useDispatch()

  const [measure, setMeasure] = useState(65);
  const [errMsg, setErrMsg] = useState('');
  const [errorFlag, setErrorFlag] = useState(false);
  const [descriptor, setDescriptor] = useState<string | null>('');


  const [timer1, setTimer1] = useState(0)
  const [count, setCount] = useState(0)
  const [startSec, setStartSec] = useState(Date.now())

  useEffect(() => {
    // discover characteristic descriptors
    char.descriptors().then((desc) => {
      desc[0]?.read().then((val) => {
        if (val) {
          setDescriptor(Base64.decode(val.value));
        }
      });
    });


    // read on the characteristic 👏
    char.monitor(async (err, cha) => {
      if (err) {
        console.warn('ERROR');
        return;
      }
      // each received value has to be decoded with a Base64 algorythm you can find on the Internet (or in my repository 😉)
      //setMeasure(decodeBleString(cha?.value));
      let msg = base64.decode(cha?.value)
      msg = msg.replace(/[^a-zA-Z0-9%_]/g, "")
      try {
        let data = msg.split('%')
        //console.log(data.length)

        if (data.length && data.length > 2) {
          setErrorFlag(true)
          setErrMsg('err_finger')
        }
        else {
          setErrorFlag(false)
          setErrMsg('')
        }
        if (data.length && data[0] == 'avg' && data[1]) {
          const mesh = Number(data[1])
          setMeasure(mesh)
        }

      } catch (e) {
        //setMeasure(e)
      }
    });
  }, [char]);

  useEffect(() => {
    // Data to array
    let timeInMs = Math.round(Date.now() * 0.001)
    if (timeInMs > timer1) {
      setTimer1(timeInMs)
      setCount(count + 1)
      const currentSec = Number((0.001*(Date.now() - startSec)).toFixed(1))
      const current = { time: currentSec, rate: measure, clock:  moment().format('HH:mm')}
      dispatch(addCurrent(current))
    }
  }, [measure])


  return (
    <View
      key={char.uuid}
    >
      <Text style={s.descriptor}>{'Beats per minute'}</Text>
      <Text style={[s.measure]}>{(measure + ' ' + errMsg).replace(/[^a-zA-Z0-9_ ]/g, "")}</Text>

    </View>
  );
};


export { DataParsing };
