import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import MyHeader from '../components/MyHeader';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Help extends React.Component {
    render() {
        return(
            <View style = {styles.container}>
                <MyHeader title = "Help" navigation = {this.props.navigation}/>
                <ScrollView style = {styles.screen} contentContainerStyle = {{alignItems: 'center'}}>
                    <Text style = {styles.blue}>Password Guide</Text>
                    <Text style = {styles.guide}>1. A strong password contains more than <Text style = {{color: '#841DFA'}}>10</Text> characters which are a mixture of alphanumeric characters and special symbols. It is hard to remember although it is difficult to crack.</Text>
                    <Text style = {styles.guide}>2. A <Text style = {{color: '#841DFA'}}>passphrase</Text> is a group of randomly generated words or phrases which is easy to remember and is more secure than passwords. A passphrase generator can be used for this purpose, as it contains a large dictionary of unpredictable words which are merged to generate a random passphrase.</Text>
                    <Text style = {styles.guide}>3. <Text style = {{color: '#841DFA'}}>NEVER</Text> use the same password for all your accounts. This is because if one of your accounts gets hacked, then all your accounts have a chance of getting hacked.</Text>
                    <Text style = {styles.guide}>4. If you find remembering your passwords difficult, <Text style = {{color: '#841DFA'}}>Safe Pass</Text> will store them for you so that you can view them later.</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0C529',
        flex: 1
    },
    screen: {
        backgroundColor: '#fff',
        margin: 30
    },
    blue: {
        fontSize: RFValue(30),
        color: '#1EABFC',
        fontWeight: 'bold'
    },
    guide: {
        fontSize: RFValue(20),
        color: '#1DD91A',
        fontWeight: 'bold',
        marginTop: 20
    }
})