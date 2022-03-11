import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Image, TouchableOpacity, Pressable } from 'react-native';
import icon from '../assets/icon.png';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bgColor: '', 
    };
  }

  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  colors = {
    option1: '#090C08',
    option2: '#474056',
    option3: '#8A95A5',
    option4: '#B9C6AE'
  }


  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source= {require('../assets/bgImage.png')} resizeMode='cover' style={styles.image}>
          <View style={styles.titleBox}> 
            <Text style={styles.title}>ChatApp</Text> 
          </View>

          <View style={styles.mainBox}>
            <View style={styles.inputBox}>
              <Image source={icon} style={styles.icon} />
              <TextInput
                accessible={true}
                accessibilityLabel='Your Name'
                accessibilityHint='Type desired name here'
                style={styles.userInput}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder='Your name ...'
              />
            </View>

            <View style={styles.colorBox}>
              <Text style={styles.chooseColor}> Choose Background Color: </Text>
            </View>

            <View style={styles.colorArr}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='black background color'
                accessibilityHint='When pressed, it changes the background color of the chat screen to black'
                accessibilityRole='button' 
                style={styles.color1} 
                onPress={() => this.changeBgColor(this.colors.option1)}>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='purple background color'
                accessibilityHint='When pressed, it changes the background color of the chat screen to purple'
                accessibilityRole='button' 
                style={styles.color2}
                onPress={() => this.changeBgColor(this.colors.option2)}>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='grey background color'
                accessibilityHint='When pressed, it changes the background color of the chat screen to grey'
                accessibilityRole='button'
                style={styles.color3}
                onPress={() => this.changeBgColor(this.colors.option3)}>
              </TouchableOpacity>
              <TouchableOpacity 
                accessible={true}
                accessibilityLabel='light green background color'
                accessibilityHint='When pressed, it changes the background color of the chat screen to light green'
                accessibilityRole='button'
                style={styles.color4}
                onPress={() => this.changeBgColor(this.colors.option4)}>
              </TouchableOpacity>     
            </View>


            <Pressable 
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  name: this.state.name,
                  bgColor: this.state.bgColor
                })}>
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
  },

  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10
  },

  titleBox:{
    width: '60%',
    height: 'auto',
    alignItems: 'center',
    marginTop: 60,
    resizeMode: 'contain',
    flex: 1,
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  mainBox: {
    marginBottom: 30,
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 0,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    minHeight: 260,
    maxHeight: 300,
    height: '44%',
    width: '88%',
    paddingTop: 20,
    paddingBottom: 20,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 2,
    borderRadius: 1.5,
    borderColor: 'grey',
    width: '88%',
    paddingLeft: 20
},

  userInput: {
    fontSize: 16, 
    fontWeight: '300', 
    color: '#757083', 
    opacity: 0.5,
  },

  colorBox: {
    marginRight: 'auto',
    paddingLeft: 15,
    width: '88%'
  },

  chooseColor: {
    fontSize: 16, 
    fontWeight: '300', 
    color: '#757083', 
    opacity: 1,
  },

  colorArr: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '88%',
  },

  color1: {
    backgroundColor: '#090C08',
    width: 50,
    height: 50,
    borderRadius: 25
  },

  color2: {
    backgroundColor: '#474056',
    width: 50,
    height: 50,
    borderRadius: 25
  },

  color3: {
    backgroundColor: '#8A95A5',
    width: 50,
    height: 50,
    borderRadius: 25
  },

  color4: {
    backgroundColor: '#B9C6AE',
    width: 50,
    height: 50,
    borderRadius: 25
  },

  button: {
    width: '88%',
    height: 50,
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});