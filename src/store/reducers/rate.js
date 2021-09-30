import {
  ADD_DATA, ADD_CURRENT,
  UPDATE_LAST_FLASH_TIME,
  INCREMENT_FLASH_COUNT,
} from '../types'

const initialRateState = {
  current: { time: 0, rate: 42 },
  rateState: [],
  labels: [0],
  reduceLabels: [0],
  rate: [65],
  clock: [' '],
  reduceRate: [65],
  beat: true,
  lastFlashTime: Date.now(),
  dt: 0,
  pointsCount: 10, // points length for short diagramm
  triggerFlashCount: 0,
}

export const rateReducer = (state = initialRateState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        rateState: [...state.rateState, action.payload]
      }

    case ADD_CURRENT:
      let dt = (action.payload.time - state.labels[state.labels.length - 1]).toFixed(1)
      const rate = [...state.rate, action.payload.rate]
      const labels = [...state.labels, action.payload.time]
      const clock = [...state.clock, action.payload.clock]
      let pointsCount = state.pointsCount
      let redcLb = []
      let redcRt = []
      let redcClock = []
      redcLb = labels.length > pointsCount ? labels.slice((labels.length - pointsCount)) : labels
      redcRt = rate.length > pointsCount ? rate.slice((rate.length - pointsCount)) : rate

      return {
        ...state,
        rateState: [...state.rateState, action.payload],
        current: action.payload,
        labels: labels,
        rate: rate,
        clock: clock,
        reduceLabels: redcLb.length ? redcLb : state.reduceLabels,
        reduceRate: redcRt.length ? redcRt : state.reduceRate,
        beat: !state.beat,
        dt: dt,
      }

    case UPDATE_LAST_FLASH_TIME:
      return {
        ...state,
        lastFlashTime: Date.now(),
      }

    case INCREMENT_FLASH_COUNT:
      return {
        ...state,
        triggerFlashCount: state.triggerFlashCount + 1,
      }

    default:
      return state
  }
}
