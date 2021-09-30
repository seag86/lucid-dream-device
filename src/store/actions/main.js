import {
  SET_DEVICE,
  SET_RATE_TRESHOLD,
  SET_AUTO_CONNECT,
  SET_BLE_NAME,
  SET_BRAKE_TIME,
  SET_REPEAT_INTERVAL,
  SET_REPEAT_COUNT,
  SET_BLINK_COUNT,
  DEFAULTS,
} from '../types'


export const setDevice = device => {
  return {
    type: SET_DEVICE,
    payload: device
  }
}

export const setRateTreshold = rate => {
  return {
    type: SET_RATE_TRESHOLD,
    payload: rate
  }
}

export const setAutoConnect = check => {
  return {
    type: SET_AUTO_CONNECT,
    payload: check
  }
}

export const setBleName = name => {
  return {
    type: SET_BLE_NAME,
    payload: name
  }
}

export const setBrakeTime = time => {
  return {
    type: SET_BRAKE_TIME,
    payload: time
  }
}

export const setRepeatInterval = (sec) => {
  return {
    type: SET_REPEAT_INTERVAL,
    payload: sec
  }
}

export const setRepeatCount= (count) => {
  return {
    type: SET_REPEAT_COUNT,
    payload: count
  }
}

export const setBlinkCount = (count) => {
  return {
    type: SET_BLINK_COUNT,
    payload: count
  }
}

export const setDefaults = () => {
  return {
    type: DEFAULTS,
  }
}