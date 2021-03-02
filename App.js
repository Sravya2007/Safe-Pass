import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import AddPassword from './screens/AddPassword';
import { StackNavigator }  from './components/StackNavigator';
import { DrawerNavigator } from './components/DrawerNavigator';

export default class App extends React.Component {
  render() {  
    return (
      <AppContainer/>
    );
  }
}

const SwitchNavigator = createSwitchNavigator({
  Welcome:{
    screen: Welcome
  },
  DrawerNavigator: {
    screen: DrawerNavigator
  }
})

const AppContainer = createAppContainer(SwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
