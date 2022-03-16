import React from 'react';
import { View, Text, StyleSheet,Platform, KeyboardAvoidingView, LogBox} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import config from '../config'

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
LogBox.ignoreAllLogs();//Ignore all log notifications

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      }
    }
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase.firestore().collection('messages');

  }



  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({
      title: name
    });
    
    // Firebase authentication
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }

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
    });
  }

  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
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
          _id:data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });

    this.setState({
      messages: messages,
    });
  };

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

  render() {
    const { bgColor } = this.props.route.params;
  
    return (
      <View style={styles.container}>
        <View style={{flex:1, backgroundColor:bgColor}}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.state.uid,
              name: this.state.user.name,
              avatart: this.state.user.avatar
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
