import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      contact: '',
      email: firebase.auth().currentUser.email,
      docId: ''
    }
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

getUserDetails = () =>{
  var email = this.state.email;
  db.collection('users').where('email', '==', email).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      var data = doc.data()
      this.setState({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        contact: data.contact,
        docId: doc.id
      })
    });
  })
}

save = () =>{
  db.collection('users').doc(this.state.docId)
  .update({
    "firstName": this.state.firstName,
    "lastName": this.state.lastName,
    "contact": this.state.contact,
    "email": this.state.email
  })
  Alert.alert("Your profile was updated successfully!")
}

componentDidMount() {
  this.getUserDetails();
}

render() {
  return(
    <View style = {styles.container}>
      <MyHeader title = "Settings" navigation = {this.props.navigation}/>
      <Input
      leftIcon = {{name: 'user', type: 'feather', color: '#fff'}}
      containerStyle = {{marginTop: 15}}
      placeholder = 'First Name'
      placeholderTextColor = '#fff'
      label = 'First Name'
      labelStyle = {{fontSize: RFValue(20), color: '#D9361A'}}
      inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
      inputStyle = {{fontSize: RFValue(20), color: '#fff', marginLeft: 5}}
      onChangeText = {(text)=>{
      this.setState({
      firstName: text
      })
      }}
      value = {this.state.firstName}
      />
      <Input
      leftIcon = {{name: 'user', type: 'feather', color: '#fff'}}
      containerStyle = {{marginTop: 15}}
      placeholder = 'Last Name'
      placeholderTextColor = '#fff'
      label = 'Last Name'
      labelStyle = {{fontSize: RFValue(20), color: '#D9361A'}}
      inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
      inputStyle = {{fontSize: RFValue(20), color: '#fff', marginLeft: 5}}
      onChangeText = {(text)=>{
      this.setState({
      lastName: text
      })
      }}
      value = {this.state.lastName}
      />
      <Input
      leftIcon = {{name: 'phone', type: 'feather', color: '#fff'}}
      containerStyle = {{marginTop: 15}}
      placeholder = 'Contact'
      placeholderTextColor = '#fff'
      label = 'Contact'
      labelStyle = {{fontSize: RFValue(20), color: '#D9361A'}}
      inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
      inputStyle = {{fontSize: RFValue(20), color: '#fff', marginLeft: 5}}
      keyboardType = {"numeric"}
      maxLength = {10}
      onChangeText = {(text)=>{
      this.setState({
      contact: text
      })
      }}
      value = {this.state.contact}
      />
      <Input
      leftIcon = {{name: 'mail', type: 'feather', color: '#fff'}}
      containerStyle = {{marginTop: 15}}
      placeholder = 'email@address.com'
      placeholderTextColor = '#fff'
      label = 'E-mail Address'
      labelStyle = {{fontSize: RFValue(20), color: '#D9361A'}}
      inputContainerStyle = {{borderWidth: 1, backgroundColor: '#841DFA'}}
      inputStyle = {{fontSize: RFValue(20), color: '#fff', marginLeft: 5}}
      keyboardType = {"email-address"}
      onChangeText = {(text)=>{
      this.setState({
      email: text
      })
      }}
      value = {this.state.email}
      />
      <TouchableOpacity
      onPress = {() => {
      this.resetPassword(this.state.email)
      this.props.navigation.navigate('Welcome')
      }}
      style = {{alignItems: 'center', marginTop: 20}}>
        <Text style = {styles.buttonText}>RESET PASSWORD</Text>
      </TouchableOpacity>
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
backgroundColor: '#1EABFC',
marginTop: 30
},
buttonText: {
color: '#fff',
fontSize: RFValue(18),
fontWeight: 'bold',
alignSelf: 'center'
}
})