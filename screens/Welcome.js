import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            email:'',
            password:'',
            confirmPassword:'',
            firstName:'',
            lastName:'',
            contact:'',
            isModalVisible:'false',
            firstName: '',
            lastName: '',
            email: '',
            contact: ''
        }
    }

    signUp = (email, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("Your password does not match.\nPlease check your password.")
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                db.collection('users').add({
                  firstName:this.state.firstName,
                  lastName:this.state.lastName,
                  email:this.state.email,
                  contact:this.state.contact
                })
                return Alert.alert('You successfully registered!')
              })
            .catch((error)=> {
              var errorMessage = error.message;
              return Alert.alert(errorMessage)
            });
          }
    }

    login = (email, password) =>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            this.props.navigation.navigate('Home')
        })
        .catch((error)=> {
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }

    resetPassword = (email) =>{
      firebase.auth().sendPasswordResetEmail(email)
      .then(()=>{
        return  Alert.alert('Email sent to your inbox', 'If you did not receive it please check in spam or junk.');
      })
      .catch((error)=> {
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      })
  }

    showModal = () =>{
        return (
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.isModalVisible}>
                <ScrollView style = {{flex: 1, backgroundColor: '#fff'}}>
                  <Icon
                  name = "x"
                  type = "feather"
                  size = {RFValue(30)}
                  containerStyle = {{marginLeft: 350, marginTop: 10}}
                  onPress = {() =>{
                    this.setState({
                      isModalVisible: false
                    })
                  }}/>
                  <View style = {styles.titleView}>
                    <Text style = {styles.green}>Sign </Text>
                    <Text style = {styles.blue}>Up</Text>
                  </View>
                  <Input
                  placeholder = 'Eg: John'
                  placeholderTextColor = '#fff'
                  label = 'First Name'
                  labelStyle = {{fontSize: RFValue(20), color: '#1DD91A'}}
                  inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
                  inputStyle = {{fontSize: RFValue(20), color: '#fff'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      firstName: text
                    })
                  }}/>
                  <Input
                  placeholder = 'Eg: Doe'
                  placeholderTextColor = '#fff'
                  label = 'Last Name'
                  labelStyle = {{fontSize: RFValue(20), color: '#1DD91A'}}
                  inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
                  inputStyle = {{fontSize: RFValue(20), color: '#fff'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      lastName: text
                    })
                  }}/>
                  <Input
                  placeholder = 'Eg: 1234567890'
                  placeholderTextColor = '#fff'
                  label = 'Contact'
                  labelStyle = {{fontSize: RFValue(20), color: '#1DD91A'}}
                  inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
                  inputStyle = {{fontSize: RFValue(20), color: '#fff'}}
                  keyboardType = {"numeric"}
                  maxLength = {10}
                  onChangeText = {(text)=>{
                    this.setState({
                      contact: text
                    })
                  }}/>
                  <Input
                  placeholder = 'email@address.com'
                  placeholderTextColor = '#fff'
                  label = 'E-mail Address'
                  labelStyle = {{fontSize: RFValue(20), color: '#1DD91A'}}
                  inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
                  inputStyle = {{fontSize: RFValue(20), color: '#fff'}}
                  keyboardType = {"email-address"}
                  onChangeText = {(text)=>{
                    this.setState({
                      email: text
                    })
                  }}/>
                  <Input
                  placeholder = '•••••••••'
                  placeholderTextColor = '#fff'
                  label = 'Password'
                  labelStyle = {{fontSize: RFValue(20), color: '#1DD91A'}}
                  inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
                  inputStyle = {{fontSize: RFValue(20), color: '#fff'}}
                  secureTextEntry = {true}
                  onChangeText = {(text)=>{
                    this.setState({
                      password: text
                    })
                  }}/>
                  <Input
                  placeholder = '•••••••••'
                  placeholderTextColor = '#fff'
                  label = 'Confirm Password'
                  labelStyle = {{fontSize: RFValue(20), color: '#1DD91A'}}
                  inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
                  inputStyle = {{fontSize: RFValue(20), color: '#fff'}}
                  secureTextEntry = {true}
                  onChangeText = {(text)=>{
                    this.setState({
                      confirmPassword: text
                    })
                  }}/>
                  <TouchableOpacity
                  style = {styles.signUp}
                  onPress = {() =>{
                    this.signUp(this.state.email, this.state.password, this.state.confirmPassword)
                  }}>
                    <Text style = {styles.buttonText}>REGISTER</Text>
                  </TouchableOpacity>
                </ScrollView>
            </Modal>
          );
    }

    render() {
        return(
            <KeyboardAvoidingView style = {styles.container}>
              {this.showModal()}
              <Image
              source = {require('../assets/Logo.png')}
              style = {styles.image}/>
              <View style = {styles.titleView}>
                <Text style = {styles.green}>Safe </Text>
                <Text style = {styles.blue}>Pass</Text>
              </View>
                <Input
                  containerStyle = {{marginTop: 15}}
                  leftIcon = {{ type: 'feather', name: 'mail', size: RFValue(30), color: '#D9361A' }}
                  placeholder = 'email@address.com'
                  placeholderTextColor = '#841DFA'
                  inputStyle = {{fontSize: RFValue(23), color: '#841DFA'}}
                  inputContainerStyle = {{borderColor: '#1DD91A', borderBottomWidth: 1.5}}
                  keyboardType="email-address"
                  label = 'E-mail Address'
                  labelStyle = {{fontSize: RFValue(20), color: '#D9361A'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      email: text
                    })
                  }}
                />
                <Input
                  leftIcon = {{ type: 'feather', name: 'lock', size: RFValue(30), color: '#D9361A' }}
                  placeholder = 'Enter your password'
                  placeholderTextColor = '#841DFA'
                  inputStyle = {{fontSize: RFValue(23), color: '#841DFA'}}
                  inputContainerStyle = {{borderColor: '#1EABFC', borderBottomWidth: 1.5}}
                  secureTextEntry = {true}
                  label = 'Password'
                  labelStyle = {{fontSize: RFValue(20), color: '#D9361A'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      password: text
                    })
                  }}
                />
              <TouchableOpacity
              style = {styles.login}
              onPress = {() => {
                this.login(this.state.email, this.state.password)
              }}>
                <Text style = {styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style = {styles.signUp}
              onPress = {() => this.setState({
                isModalVisible: true
              })}>
                <Text style = {styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>
                <TouchableOpacity
                onPress = {() => {
                  this.resetPassword(this.state.email)
                }}
                style = {{alignItems: 'center', marginTop: 20}}>
                <Text style = {styles.buttonText}>I FORGOT MY PASSWORD</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0C529',
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    width: 350,
    height: 260,
    alignSelf: 'center'
  },
  green: {
    fontSize: RFValue(40),
    color: '#1DD91A',
    fontWeight: 'bold'
  },
  blue: {
    fontSize: RFValue(40),
    color: '#1EABFC',
    fontWeight: 'bold'
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  login: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    height: 50,
    backgroundColor: '#1DD91A'
  },
  signUp: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    height: 50,
    marginTop: 30,
    backgroundColor: '#1EABFC'
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(18),
    fontWeight: 'bold',
    alignSelf: 'center'
  }
})