import {
  ADD_DATA,
  ADD_CURRENT,
  UPDATE_LAST_FLASH_TIME,
  INCREMENT_FLASH_COUNT,
} from '../types'


export const addData = data => {
  return {
    type: ADD_DATA,
    payload: data
  }
}

export const addCurrent = current => {
  return {
    type: ADD_CURRENT,
    payload: current
  }
}

export const updateLastFlashTime = () => {
  return {
    type: UPDATE_LAST_FLASH_TIME,
    payload: null
  }
}

export const incrementFlashCount = () => {
  return {
    type: INCREMENT_FLASH_COUNT,
    payload: null
  }
}


