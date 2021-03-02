import React, { Component } from 'react';
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Icon } from'react-native-elements';
import firebase from 'firebase';

export default class CustomSideBar extends Component{
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props} labelStyle = {{color: '#fff', fontSize: 15}}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('Welcome')
              firebase.auth().signOut()
          }}>
            <Icon name = "home" type = "feather" size = {30} color = "#fff"/>
            <Text style = {styles.logOutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DD91A'
  },
  drawerItemsContainer: {
    flex: 0.8,
    marginTop: 50
  },
  logOutContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    paddingBottom: 30
  },
  logOutButton: {
    height: 30,
    padding: 20,
    width: '100%',
    justifyContent: 'center'
  },
  logOutText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#fff'
  }
})