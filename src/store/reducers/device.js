import { ADD_DEVICE, CLEAR } from '../types'

const initialState = []
// Reducer to add only the devices which have not been added yet
// When the bleManager search for devices, each time it detect a ble device, it returns the ble device even if this one has already been returned
export const deviceReducer = ( state = initialState, action )=> {
  switch (action.type) {
    case ADD_DEVICE:
      const { payload: device } = action;

      // check if the detected device is not already added to the list
      if (device && !state.find((dev) => dev.id === device.id)) {
        return [...state, device];
      }
      return state;
    case CLEAR:
      return [];
    default:
      return state;
  }
};
