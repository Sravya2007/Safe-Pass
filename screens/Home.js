import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, FlatList } from 'react-native';
import { Icon, ListItem, Avatar } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            userEmail: firebase.auth().currentUser.email,
            allAccounts: []
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
                    <ListItem.Title
                    style = {{color: '#1EABFC', fontWeight: 'bold', fontSize: 20}} 
                    onPress ={()=>{
                        this.props.navigation.navigate("SeePassword")
                    }}>{item.accountName}</ListItem.Title>
                </ListItem.Content>
                <TouchableOpacity
                style = {styles.view}>
                </TouchableOpacity>
          </ListItem>
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
    }
})