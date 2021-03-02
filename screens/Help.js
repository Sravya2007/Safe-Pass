import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import MyHeader from '../components/MyHeader';

export default class Help extends React.Component {
    render() {
        return(
            <View style = {styles.container}>
                <MyHeader title = "Help" navigation = {this.props.navigation}/>
                <Text style = {{alignSelf: 'center', fontSize: 20, color: '#fff', fontWeight: 'bold', marginTop: 300}}>Help</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0C529',
        flex: 1
    }
})