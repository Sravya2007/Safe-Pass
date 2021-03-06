import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Header, Icon, Avatar, Input } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default class AddPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            userEmail: firebase.auth().currentUser.email,
            accountName: '',
            password: '',
            image: '#'
        }
    }

    savePassword = async(accountName, password, image) =>{
        if(this.state.accountName && this.state.password) {
            db.collection("user_accounts").add({
                email: this.state.userEmail,
                accountName: accountName,
                image: image
            })

            await SecureStore.setItemAsync(accountName, password)

            this.setState({
                accountName: '',
                password: '',
                image: '#'
            })
            
            Alert.alert('Your password was saved successfully!')
        } else {
            Alert.alert('Please fill all the fields.')
        }
    }

    selectPicture = async() =>{
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
    
        if (!cancelled) {
            this.uploadImage(uri, this.state.userEmail);
        }
    }

    uploadImage = async(uri, imageName) =>{
        var response = await fetch(uri)
        var blob = await response.blob()
        var ref = firebase
        .storage()
        .ref()
        .child("account_pictures/" + imageName)

        return ref.put(blob).then((response) => {
            this.fetchImage(imageName)
        })
    }

    fetchImage = (imageName) =>{
        var storageRef = firebase
        .storage()
        .ref()
        .child("account_pictures/" + imageName)
        storageRef
        .getDownloadURL()
        .then((url) => {
            this.setState({
                image: url
            })
        })
        .catch((error) => {
            this.setState({
                image: "#"
            })
        })
    }

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

                <Input
                  containerStyle = {{marginTop: 15}}
                  leftIcon = {{ type: 'feather', name: 'user', size: 30, color: '#D9361A' }}
                  placeholder = 'Eg: Google Account'
                  placeholderTextColor = '#841DFA'
                  inputStyle = {{fontSize: 23, color: '#841DFA'}}
                  inputContainerStyle = {{borderColor: '#1DD91A', borderBottomWidth: 1.5}}
                  label = 'Account Name'
                  labelStyle = {{fontSize: 20, color: '#D9361A'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      accountName: text
                    })
                  }}
                  value = {this.state.accountName}
                />

                <Input
                  leftIcon = {{ type: 'feather', name: 'lock', size: 30, color: '#D9361A' }}
                  placeholder = "Enter your account's password"
                  placeholderTextColor = '#841DFA'
                  inputStyle = {{fontSize: 23, color: '#841DFA'}}
                  inputContainerStyle = {{borderColor: '#1EABFC', borderBottomWidth: 1.5}}
                  secureTextEntry = {true}
                  label = 'Password'
                  labelStyle = {{fontSize: 20, color: '#D9361A'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      password: text
                    })
                  }}
                  value = {this.state.password}
                />

                <Avatar
                rounded
                source = {{
                    uri: this.state.image
                }}
                size = {"xlarge"}
                onPress = {() => this.selectPicture()}
                containerStyle = {{alignSelf: 'center'}}
                placeholderStyle = {{backgroundColor: '#D9361A'}}
                icon = {{name: "user", type: "feather"}}
                >
                <Avatar.Accessory size = {50} style = {{backgroundColor: '#841DFA'}}/>
                </Avatar>

                <TouchableOpacity
                style = {styles.save}
                onPress = {() => {
                    this.savePassword(this.state.accountName, this.state.password, this.state.image)
                }}>
                    <Text style = {styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0C529',
        flex: 1
    },
    save: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 330,
        height: 50,
        backgroundColor: '#1DD91A',
        marginTop: 30
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center'
    }
})