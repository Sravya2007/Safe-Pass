import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Home  from '../screens/Home';
import AddPassword from '../screens/AddPassword';
import SeePassword from '../screens/SeePassword';

export const StackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      headerShown: false
    }
  },
  AddPassword: {
    screen: AddPassword,
    navigationOptions:{
      headerShown: false
    }
  },
  SeePassword: {
    screen: SeePassword,
    navigationOptions:{
      headerShown: false
    }
  }
},
  {initialRouteName: 'Home'}
);