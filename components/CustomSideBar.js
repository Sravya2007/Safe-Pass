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
          <DrawerItems {...this.props} labelStyle = {{color: '#fff', fontSize: 20}} itemsContainerStyle = {{marginTop: 100}} itemStyle = {{marginTop: 50}}/>
        </View>
        <View style={styles.logOutContainer}>
          <Icon name = "log-out" type = "feather" color = "#fff"/>
          <TouchableOpacity
          style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('Welcome')
              firebase.auth().signOut()
          }}>
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
    flex: 0.8
  },
  logOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: -150
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