import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { StackNavigator } from './StackNavigator';
import Settings from '../screens/Settings';
import Help from '../screens/Help';
import CustomSideBar from './CustomSideBar';
import { Icon } from 'react-native-elements';

export const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: StackNavigator,
        navigationOptions:{
            drawerIcon: <Icon name="home" type ="feather" color = "#fff"/>,
            drawerLabel: 'Home'
          }
    },
    Settings: {
        screen: Settings,
        navigationOptions:{
            drawerIcon: <Icon name="settings" type ="feather" color = "#fff"/>,
            drawerLabel: 'Settings'
          }
    },
    Help: {
        screen: Help,
        navigationOptions:{
            drawerIcon: <Icon name="help-circle" type ="feather" color = "#fff"/>,
            drawerLabel: 'Help'
          }

    }
},
    { contentComponent: CustomSideBar },
    { initialRouteName: 'Home' }
)