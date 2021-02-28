import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import firebase from 'firebase';
import db from './config';

export default class App extends React.Component {
  render() {  
    return (
      <AppContainer/>
    );
  }
}

const switchNavigator = createSwitchNavigator({
  Welcome:{
    screen: Welcome
  },
  Home:{
    screen: Home
  }
})

const AppContainer = createAppContainer(switchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
