import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Text, ScrollView, Button, View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { updateLastFlashTime, incrementFlashCount } from '../store/actions/rate'
import { Service } from 'react-native-ble-plx';
import { ServiceCard } from '../components/ServiceCard';
import { RootStackParamList } from '../navigation/index';
import RNFS from 'react-native-fs';
import Torch from 'react-native-torch';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import s from '../styles/style'

import { LineChart } from "react-native-chart-kit";


const Device = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'Device'>) => {

  const dispatch = useDispatch()

  const { rateState, current, labels, rate, clock, reduceLabels, reduceRate, beat, dt, lastFlashTime, triggerFlashCount } = useSelector(state => state.rate)
  const { firstDelay, breakTime, rateTreshold, repeatTime, repeatCount, blinkCount, device } = useSelector(state => state.main)

  const [isConnected, setIsConnected] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [msg, setMsg] = useState('-');
  const [chartType, setChartType] = useState(false);
  const [staticLabels, setStaticLabels] = useState([])
  const [staticRates, setStaticRates] = useState([])
  const [hidePointsIndexes, setHidePointsIndexes] = useState([])
  const [startTime] = useState(Date.now());



  useEffect(() => {
    setMsg('dT=' + dt+'s')
    //--- WakeUper --------------------------
    if ( current.rate > rateTreshold
      && Date.now() > ( startTime + firstDelay * 60 * 1000)
      && Date.now() > (lastFlashTime + breakTime * 60 * 1000)) {
      dispatch(incrementFlashCount())
      dispatch(updateLastFlashTime())
      flashLight()
    }

  }, [current])


  const flashLight = () => {
    //Torch.switchState(true);  Turn ON
    console.log('Flash!')

    let flashArray = []
    for(let i = 0; i<blinkCount; i++) {
      flashArray.push([true, i*1000])
      flashArray.push([false, i*1000+500])
    }

    for (let i = 0; i < repeatCount; i++) {
      BackgroundTimer.setTimeout(() => {
        flashArray.map(([tumbler, time]) => {
          BackgroundTimer.setTimeout(() => Torch.switchState(tumbler), time)
        })
      }, repeatTime* 1000 * i)
    }
  }

  const saveLogToFile = () => {

    const flotArr = []
    rateState.map((item, index) => flotArr.push([item.time, item.rate]))
    const stringJSON = 'let d = ' + JSON.stringify(flotArr);

    var path = RNFS.DocumentDirectoryPath + `/log_${moment().format('DDMMYY_HHmmss')}.js`;

    // write the file
    RNFS.writeFile(path, stringJSON, 'utf8')
      .then((success) => {
        setMsg('Written ' + rateState.length + ' points to file ' + path)
        return true
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const changeDiagram = () => {
    if(!chartType){
      
      setStaticLabels(clock)
      setStaticRates(rate)

      const xCount = labels.length > 1000 ? Math.round(labels.length/200) : 12
      const hidePointsIndexes = []
      let indexes = rate.length
      let m = Math.round(indexes/xCount)
      let showInds = []

      for(let i=0; i<xCount; i++) showInds.push(m*i)

      labels.map((lb, ind)=>{
        if(showInds.indexOf(ind) == -1 ) hidePointsIndexes.push(ind)
      })
      setHidePointsIndexes(labels.length > xCount ? hidePointsIndexes : [])
    }
    setChartType(!chartType)
  }


  // handle the device disconnection
  const disconnectDevice = useCallback(async () => {

    navigation.navigate('Home');
    const isDeviceConnected = await device.isConnected();
    if (isDeviceConnected) {
      await device.cancelConnection();
    }
    setMsg('disconnected')
  }, [device, navigation]);

  useEffect(() => {
    const getDeviceInformations = async () => {
      // connect to the device
      const connectedDevice = await device.connect();
      setIsConnected(true);
      setMsg('connected')

      // discover all device services and characteristics
      const allServicesAndCharacteristics = await connectedDevice.discoverAllServicesAndCharacteristics();
      // get the services only
      const discoveredServices = await allServicesAndCharacteristics.services();
      // setServices(discoveredServices);
      let term_serv_arr = discoveredServices.filter((serv, ind) => serv.uuid == device.serviceUUIDs)
      setServices(term_serv_arr);
    };

    getDeviceInformations();

    device.onDisconnected(() => {
      navigation.navigate('Home');
      setMsg('disconnected')
    });

    // give a callback to the useEffect to disconnect the device when we will leave the device screen
    return () => {
      disconnectDevice();
    };
  }, [device, disconnectDevice, navigation]);

  // useEffect(() => {
  //   flashLight()
  // }, [])


  return (
    <ScrollView contentContainerStyle={s.deviceContainer}>
      {/* <Button title="disconnect" onPress={disconnectDevice} />
      <View style={{ marginTop: 10 }} /> */}
      <Button title="save log" onPress={saveLogToFile} />
      <View style={{ marginTop: 10 }} />
      <Button title={chartType ? 'short diogram' : 'full diogram'} onPress={changeDiagram} />


      <View >
        <View style={s.deviceHeader}>
          {/* <Text>{`Name : ${device.name}`}</Text> */}
          {/* <Text>{`Id : ${device.id}`}</Text> */}
          {/* <Text>{`Is connected : ${isConnected}`}</Text> */}
          <Text>{`RSSI : ${device.rssi}`}</Text>
          <Text>{`Flash count: `} <Text style={{ color: '#fff'}}>{triggerFlashCount}</Text></Text>
          <Text style={{ color: beat ? '#fff' : '#f99' }}>{`Msg : ` + msg}</Text>
        </View>
        <View >
          <ServiceCard service={services[0]} />
        </View>
      </View>


      <ScrollView horizontal={true} >

        {
          chartType
            ?
            <LineChart
              data={{
                labels: staticLabels,
                datasets: [
                  {
                    data: staticRates,
                  }
                ]
              }}
              width={
                staticRates.length*0.5 < 640
                  ? 640
                  : staticRates.length*0.5
              }
              height={220}
              //yAxisLabel="$"
              //yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "1",
                  strokeWidth: "1",
                  stroke: "#ffa726"
                }
              }}
              hidePointsAtIndex={hidePointsIndexes}
              //bezier
              style={{
                marginVertical: 5,
                borderRadius: 16
              }}
            />
            :
            <LineChart
              data={{
                labels: reduceLabels,
                datasets: [
                  {
                    data: reduceRate,
                  }
                ]
              }}
              width={Dimensions.get("window").width - 20}
              height={220}
              //yAxisLabel="$"
              //yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "1",
                  strokeWidth: "1",
                  stroke: "#ffa726"
                }
              }}
              //bezier
              formatXLabel={(x)=>Math.round(Number(x))}
              style={{
                marginVertical: 5,
                borderRadius: 16
              }}
            />
        }
      </ScrollView>
    </ScrollView>
  );
};

export { Device };
