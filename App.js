import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from './middleware/logger'

import AppManager from "./components/AppManager";
import Home from "./components/Home"



export default function App() {

  return (
      <View style={{ flex: 1 }}>
<Provider store={createStore(reducer, applyMiddleware(thunk,logger))}>
  <Home />
</Provider>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
