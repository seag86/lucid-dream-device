import React from 'react';
import { Provider } from 'react-redux'
import 'react-native-gesture-handler';
import store from './src/store'
import { RootNavigator } from './src/navigation';

export default () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  )
};






