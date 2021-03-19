import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Header, Icon, Input, Avatar } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from "expo-image-picker";
import { RFValue } from 'react-native-responsive-fontsize';

export default class SeePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: firebase.auth().currentUser.email,
            accountName: this.props.navigation.getParam('accountName'),
            password: '',
            image: '#',
            docId: ''
        }
    }

    getPassword = async(accountName) =>{
        var password = await SecureStore.getItemAsync(accountName.trim())
        this.setState({
            password: password
        })
    }

    getImage = () =>{
        db.collection("user_accounts")
        .where("accountName", "==", this.state.accountName)
        .where("email", "==", this.state.userEmail)
        .onSnapshot(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                this.setState({
                    image: doc.data().image,
                    docId : doc.id
                })
            })
        })
    }

    selectPicture = async() =>{
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
    
        if(!cancelled) {
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

    save = async() =>{
        await db.collection("user_accounts")
        .doc(this.state.docId)
        .update({
            accountName: this.state.accountName,
            image: this.state.image
        })
        await SecureStore.setItemAsync(this.state.accountName.trim(), this.state.password)
        Alert.alert('Your details have been updated!')
    }

    componentDidMount() {
        this.getPassword(this.state.accountName)
        this.getImage()
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
                size = {RFValue(30)}
                onPress={() => this.props.navigation.goBack()}/>
                }
                centerComponent={{ text: 'See Password', style: {color: '#ffffff', fontSize: RFValue(28), fontWeight: "bold"} }}
                backgroundColor = "#1DD91A"/>

                <Avatar
                rounded
                source = {{
                    uri: this.state.image
                }}
                size = {"xlarge"}
                onPress = {() => this.selectPicture()}
                containerStyle = {{alignSelf: 'center', marginTop: 30}}
                placeholderStyle = {{backgroundColor: '#D9361A'}}
                icon = {{name: "user", type: "feather"}}
                >
                <Avatar.Accessory size = {RFValue(50)} style = {{backgroundColor: '#841DFA'}}/>
                </Avatar>

                <Input
                  containerStyle = {{marginTop: 15}}
                  leftIcon = {{ type: 'feather', name: 'user', size: RFValue(30), color: '#D9361A' }}
                  placeholder = {this.state.accountName}
                  placeholderTextColor = '#841DFA'
                  inputStyle = {{fontSize: RFValue(23), color: '#841DFA'}}
                  inputContainerStyle = {{borderColor: '#1DD91A', borderBottomWidth: 1.5}}
                  label = 'Account Name (Only one word with no special characters)'
                  labelStyle = {{fontSize: RFValue(20), color: '#D9361A'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      accountName: text
                    })
                  }}
                  value = {this.state.accountName}
                />

                <Input
                  leftIcon = {{ type: 'feather', name: 'lock', size: RFValue(30), color: '#D9361A' }}
                  placeholder = {this.state.password}
                  placeholderTextColor = '#841DFA'
                  inputStyle = {{fontSize: RFValue(23), color: '#841DFA'}}
                  inputContainerStyle = {{borderColor: '#1EABFC', borderBottomWidth: 1.5}}
                  label = 'Password'
                  labelStyle = {{fontSize: RFValue(20), color: '#D9361A'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      password: text
                    })
                  }}
                  value = {this.state.password}
                />
                <TouchableOpacity
                style = {styles.save}
                onPress = {() => {
                    this.save()
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
      fontSize: RFValue(18),
      fontWeight: 'bold',
      alignSelf: 'center'
    }
})