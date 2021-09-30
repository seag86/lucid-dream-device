import { createStore, combineReducers } from 'redux'
import { rateReducer } from './reducers/rate'
import { deviceReducer } from './reducers/device'
import { mainReducer } from './reducers/main'

const rootReducer = combineReducers({
  main: mainReducer,
  rate: rateReducer,
  devices: deviceReducer,
})
export default  createStore(rootReducer)
