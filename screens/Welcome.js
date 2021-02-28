import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

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
                  size = {30}
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
                  placeholder = 'First Name'
                  placeholderTextColor = '#fff'
                  label = 'First Name'
                  labelStyle = {{fontSize: 20, color: '#1DD91A'}}
                  inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
                  inputStyle = {{fontSize: 20, color: '#fff'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      firstName: text
                    })
                  }}/>
                  <Input
                  placeholder = 'Last Name'
                  placeholderTextColor = '#fff'
                  label = 'Last Name'
                  labelStyle = {{fontSize: 20, color: '#1DD91A'}}
                  inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
                  inputStyle = {{fontSize: 20, color: '#fff'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      lastName: text
                    })
                  }}/>
                  <Input
                  placeholder = 'Contact'
                  placeholderTextColor = '#fff'
                  label = 'Contact'
                  labelStyle = {{fontSize: 20, color: '#1DD91A'}}
                  inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
                  inputStyle = {{fontSize: 20, color: '#fff'}}
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
                  labelStyle = {{fontSize: 20, color: '#1DD91A'}}
                  inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
                  inputStyle = {{fontSize: 20, color: '#fff'}}
                  keyboardType = {"email-address"}
                  onChangeText = {(text)=>{
                    this.setState({
                      email: text
                    })
                  }}/>
                  <Input
                  placeholder = 'Enter your Password'
                  placeholderTextColor = '#fff'
                  label = 'Password'
                  labelStyle = {{fontSize: 20, color: '#1DD91A'}}
                  inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
                  inputStyle = {{fontSize: 20, color: '#fff'}}
                  secureTextEntry = {true}
                  onChangeText = {(text)=>{
                    this.setState({
                      password: text
                    })
                  }}/>
                  <Input
                  placeholder = 'Confirm Password'
                  placeholderTextColor = '#fff'
                  label = 'Confirm Password'
                  labelStyle = {{fontSize: 20, color: '#1DD91A'}}
                  inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
                  inputStyle = {{fontSize: 20, color: '#fff'}}
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
                  leftIcon = {{ type: 'feather', name: 'mail', size: 30, color: '#D9361A' }}
                  placeholder = 'email@address.com'
                  placeholderTextColor = '#841DFA'
                  inputStyle = {{fontSize: 23, color: '#841DFA'}}
                  inputContainerStyle = {{borderColor: '#1DD91A', borderBottomWidth: 1.5}}
                  keyboardType="email-address"
                  label = 'E-mail Address'
                  labelStyle = {{fontSize: 20, color: '#D9361A'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      email: text
                    })
                  }}
                />
                <Input
                  leftIcon = {{ type: 'feather', name: 'lock', size: 30, color: '#D9361A' }}
                  placeholder = 'Enter your password'
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
    fontSize: 40,
    color: '#1DD91A',
    fontWeight: 'bold'
  },
  blue: {
    fontSize: 40,
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
    fontSize: 18,
    fontWeight: 'bold'
  }
})