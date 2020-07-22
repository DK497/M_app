import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {Provider} from 'react-redux'
import {ConfigureStore} from './redux/configureStore'
import  Main from './components/MainComponent'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent'

const {persistor,store}=ConfigureStore()
// 'redux-persist/es/integration/react'

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading/>} persistor={persistor}>
            <Main />
        </PersistGate>
      </Provider>
    );
  }
}

