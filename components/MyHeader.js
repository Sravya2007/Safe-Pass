import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default class MyHeader extends React.Component {
    render() {
        return(
            <Header
            leftComponent={<Icon name='menu' type='feather' color='#fff' size={30} onPress={() => this.props.navigation.toggleDrawer()}/>}
            centerComponent={{ text: this.props.title, style: {color: '#ffffff', fontSize: 30, fontWeight:"bold"} }}
            backgroundColor = "#1DD91A"/>
        )
    }
}