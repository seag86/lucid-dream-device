import {
  SET_DEVICE,
  SET_RATE_TRESHOLD,
  SET_AUTO_CONNECT,
  SET_BLE_NAME,
  SET_BRAKE_TIME,
  SET_REPEAT_INTERVAL,
  SET_REPEAT_COUNT,
  SET_BLINK_COUNT,
  SET_FIRST_DELAY,
  DEFAULTS,
} from '../types'

export const initialState = {
  // flash
  firstDelay: 90, // min. to asleep
  breakTime: 3, // min. break
  repeatTime: 5, // sec.
  repeatCount: 2,
  blinkCount: 3,

  defaultBleName: 'Boba',
  autoConnect: false,
  rateTreshold: 60,

  device: null,

}

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVICE:
      return {
        ...state,
        device: action.payload,
      }

    case SET_RATE_TRESHOLD:
      return {
        ...state,
        rateTreshold: action.payload,
      }

    case SET_AUTO_CONNECT:
      return {
        ...state,
        autoConnect: action.payload,
      }

    case SET_BLE_NAME:
      return {
        ...state,
        defaultBleName: action.payload,
      }

    case SET_BRAKE_TIME:
      return {
        ...state,
        breakTime: action.payload,
      }

    case SET_FIRST_DELAY:
      return {
        ...state,
        firstDelay: action.payload,
      }

    case SET_REPEAT_INTERVAL:
      return {
        ...state,
        repeatTime: action.payload,
      }

    case SET_REPEAT_COUNT:
      return {
        ...state,
        repeatCount: action.payload,
      }

    case SET_BLINK_COUNT:
      return {
        ...state,
        blinkCount: action.payload,
      }

    case DEFAULTS:
      return initialState

    default:
      return state
  }
}
