import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class Home extends React.Component {
    render() {
        return(
            <View style = {styles.container}>
                <MyHeader title = "Home" navigation = {this.props.navigation}/>
                <Text style = {{alignSelf: 'center', fontSize: 20, color: '#fff', fontWeight: 'bold', marginTop: 300}}>Home</Text>
                <TouchableOpacity
                style = {styles.addButton}
                onPress = {() =>{
                    this.props.navigation.navigate('AddPassword')
                }}>
                    <Icon name = "plus" type = "feather" color = "#fff" size = {30}/>
                </TouchableOpacity>
                <View style = {styles.addView}>
                    <Text style = {styles.addText}>Add Password</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0C529',
        flex: 1
    },
    addButton: {
        backgroundColor: '#1EABFC',
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginTop: 350
    },
    addView: {
        backgroundColor: '#fff',
        width: 110,
        height: 30,
        borderRadius: 5,
        marginVertical: -40,
        justifyContent: 'center',
        marginLeft: 240
    },
    addText: {
        alignSelf: 'center',
        color: '#1EABFC'
    }
})