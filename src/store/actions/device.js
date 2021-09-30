import { ADD_DEVICE, CLEAR} from '../types'


export const addDevice =  device => {
  return {
    type: ADD_DEVICE,
    payload: device
  }
}

export const clear =  () => {
  return {
    type: CLEAR,
    payload: null
  }
}

export const setDevice =  device => {
  return {
    type: SET_DEVICE,
    payload: device
  }
}

