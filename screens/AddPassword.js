import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default class AddPassword extends React.Component {
    render() {
        return(
            <View style = {styles.container}>
                <Header
                leftComponent = {
                <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                size = {30}
                onPress={() => this.props.navigation.goBack()}/>
                }
                centerComponent={{ text: 'Add Password', style: {color: '#ffffff', fontSize: 30, fontWeight: "bold"} }}
                backgroundColor = "#1DD91A"/>
                <Text style = {{alignSelf: 'center', fontSize: 20, color: '#fff', fontWeight: 'bold', marginTop: 300}}>Add Password</Text>
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