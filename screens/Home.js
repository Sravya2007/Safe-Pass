import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, FlatList } from 'react-native';
import { Icon, ListItem, Avatar, Input } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            userEmail: firebase.auth().currentUser.email,
            allAccounts: [],
            email: '',
            password: '',
            isModalVisible: 'false',
            accountName: ''
        }
        this.accountRef = null;
    }

    getAllAccounts = () =>{
        this.accountRef = db.collection("user_accounts")
        .where("email", "==", this.state.userEmail)
        .onSnapshot((snapshot) =>{
            var allAccounts = snapshot.docs.map(document => document.data());
            this.setState({
                allAccounts: allAccounts
            })
        })
    }

    login = (email, password) =>{
        if(this.state.email === this.state.userEmail) {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(()=>{
                this.props.navigation.navigate('SeePassword',{"accountName": this.state.accountName})
                this.setState({
                    isModalVisible: false
                })
            })
            .catch((error)=> {
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
        } else {
            Alert.alert('Login unsuccessful')
        }
    }

    componentDidMount() {
        this.getAllAccounts()
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) =>{
        return (
            <ListItem key = {i} bottomDivider containerStyle = {{margin: 20, width: 165, height: 165, flexDirection: 'column'}}>
                <Avatar
                rounded
                source = {{
                    uri: item.image
                }}
                size = {70}
                containerStyle = {{alignSelf: 'center'}}
                placeholderStyle = {{backgroundColor: '#D9361A'}}
                icon = {{name: "user", type: "feather"}}
                />
                <ListItem.Content>
                    <ListItem.Title><TouchableOpacity
                    onPress = {() =>{
                        this.setState({
                            accountName: item.accountName,
                            isModalVisible: true
                        })
                    }}><Text
                    style = {{color: '#1EABFC', fontWeight: 'bold', fontSize: 20}}>{item.accountName}</Text></TouchableOpacity></ListItem.Title>
                </ListItem.Content>
                <TouchableOpacity
                style = {styles.view}>
                </TouchableOpacity>
          </ListItem>
        )
    }

    showModal = () =>{
        return(
            <View>
                <Modal
                visible={this.state.isModalVisible}
                animationType = 'fade'
                transparent={true}>
                <ScrollView 
                contentContainerStyle = {{
                    height: 450,
                    marginTop: 150,
                    backgroundColor: '#fff',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.44,
                    shadowRadius: 10.32,
                    elevation: 16
                }}>
                <Icon
                    name = "x"
                    type = "feather"
                    size = {30}
                    containerStyle = {{marginLeft: 350, marginTop: 20}}
                    onPress = {() =>{
                    this.setState({
                        isModalVisible: false
                    })
                    }}/>
                    <Text style = {styles.blue}>Confirm that it's you before</Text>
                    <Text style = {styles.blue}>proceeding to see your password</Text>
                    <KeyboardAvoidingView>
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
                </KeyboardAvoidingView>
                <TouchableOpacity
                style = {styles.login}
                onPress = {() => {
                        this.login(this.state.email, this.state.password)
                }}>
                    <Text style = {styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                </ScrollView>
                </Modal>
            </View>
        )
    }

    render() {
        return(
            <View style = {styles.container}>
                <MyHeader title = "Home" navigation = {this.props.navigation}/>
                <View style = {styles.container}>
                {
                    this.state.allAccounts.length === 0
                    ?(
                        <View>
                        <Image
                        source = {require('../assets/NoPassword.png')}
                        style = {styles.image}/>
                        <Text style = {styles.noPwd}>You have no saved passwords</Text>
                        <Text style = {styles.noPwd}>Add a password to save it</Text>
                        <TouchableOpacity
                        style = {styles.addButton}
                        onPress = {() =>{
                            this.props.navigation.navigate('AddPassword')
                        }}>
                            <Icon name = "plus" type = "feather" color = "#fff" size = {30}/>
                        </TouchableOpacity>
                        <View style = {styles.addView}>
                            <Text style = {styles.addText}>Add Password</Text>
                        </View>
                        </View>
                    )
                    :(
                        <View>
                        {this.showModal()}
                        <FlatList
                            keyExtractor = {this.keyExtractor}
                            data = {this.state.allAccounts}
                            renderItem = {this.renderItem}
                            numColumns = {2}
                        />
                        <TouchableOpacity
                        style = {styles.addButton}
                        onPress = {() =>{
                            this.props.navigation.navigate('AddPassword')
                        }}>
                            <Icon name = "plus" type = "feather" color = "#fff" size = {30}/>
                        </TouchableOpacity>
                        <View style = {styles.addView}>
                            <Text style = {styles.addText}>Add Password</Text>
                        </View>
                        </View>
                    )
                }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0C529',
        flex: 1
    },
    addButton: {
        backgroundColor: '#1EABFC',
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        position: 'absolute',
        marginTop: 680
    },
    addView: {
        backgroundColor: '#fff',
        width: 110,
        height: 30,
        borderRadius: 5,
        marginVertical: 690,
        justifyContent: 'center',
        marginLeft: 240,
        position: 'absolute'
    },
    addText: {
        alignSelf: 'center',
        color: '#1EABFC'
    },
    image: {
      width: 350,
      height: 350,
      alignSelf: 'center'
    },
    noPwd: {
        fontSize: 22,
        color: '#841DFA',
        alignSelf: 'center',
        marginTop: 20
    },
    login: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: 330,
      height: 50,
      backgroundColor: '#1DD91A'
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center'
    },
    blue: {
        fontSize: 20,
        color: '#1EABFC',
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})