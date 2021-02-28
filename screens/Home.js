import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';

export default class Home extends React.Component {
    render() {
        return(
            <View style = {styles.container}>
                <Text style = {{alignSelf: 'center', fontSize: 20, color: '#fff', fontWeight: 'bold'}}>Home</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0C529',
        flex: 1,
        justifyContent: 'center'
    }
})