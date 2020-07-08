import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {Provider} from 'react-redux'
import {ConfigureStore} from './redux/configureStore'
import  Main from './components/MainComponent'

const store=ConfigureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

