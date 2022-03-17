import React from 'react';
import { View, Text, StyleSheet,Platform, KeyboardAvoidingView, LogBox} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

// import firebase
const firebase = require('firebase');
require('firebase/firestore');

// apiKey: `${config.API_KEY}`,

const firebaseConfig = {
  apiKey: `${config.API_KEY}`,
  authDomain: "chatapp-92663.firebaseapp.com",
  projectId: "chatapp-92663",
  storageBucket: "chatapp-92663.appspot.com",
  messagingSenderId: "650873655092",
  appId: "1:650873655092:web:20c123ec553bcc0c011f61",
  measurementId: "G-6QS7BBNRGT"
};


LogBox.ignoreLogs(['Setting a timer for a long period of time', 'undefined']);
LogBox.ignoreAllLogs();
//Ignore all log notifications

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: null,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
    }
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase.firestore().collection('messages');

  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Goes through each document
    querySnapshot.forEach((doc) => {
      // Gets the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });

    this.setState({
      messages: messages,
    });
    this.saveMessages();
  };


  //get messages from a local AsyncStorage
  getMessages = async () => {
    let messages ='';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //saves messages on the local AsyncStorage
  saveMessages = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message)
    }
  };

  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: [],
      })
    } catch (error) {
      console.log(error.message)
    }
  };


  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({
      title: name
    });
    
    NetInfo.fetch().then(connection => {
    //When user is online - authenticate the user and get their messages from Firestore
    if (connection.isConnected) {
      this.setState({
        isConnected: true
      });
      console.log('online');
    // Firebase authentication, user can sign in anonymously
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      //update user state with currently active user data
      this.setState({
        messages: [],
        uid: user.uid,
        user: {
          _id: user.uid,
          name: name,
          avatar: 'https://placeimg.com/140/140/any',
        },
      });

      this.unsubscribe = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
       // create a reference to the active user's messages
        this.referenceUserMessages = firebase
          .firestore()
          .collection('messages')
          .where('uid', '==', this.state.uid);
        });
        //save messages when online
        this.saveMessages();

        //actions when user is offline - get messages from AsyncStorage
      } else {
        console.log('offline');
        this.setState({ 
          isConnected: false
        });
        //retrieve chat from asyncstorage
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    // stop listening to authentication
    if (this.state.isConnected === true) {
      this.authUnsubscribe();
      this.unsubscribe();
    }
  }

  // Adds message to chat
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: this.state.user,
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      ()=> {
        this.addMessage();
        this.saveMessages();
      }
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'green'
          }
        }}
      />
    )
  }

  // renders the chat input field toolbar only when user is online
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar {...props}/>
      );
    }
  }

  render() {
    const { bgColor } = this.props.route.params;
  
    return (
      <View style={styles.container}>
        <View style={{flex:1, backgroundColor:bgColor}}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.state.uid,
              name: this.state.user.name,
              avatar: this.state.user.avatar
            }}
          />
          { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
        </View>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
