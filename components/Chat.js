import React from 'react';
import { View, Text, StyleSheet} from 'react-native';


export default class Chat extends React.Component {

  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({
        title: name
    });
  }

  render() {
    const { bgColor } = this.props.route.params;
  
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor:bgColor}}>
        <Text style={styles.welcome}>Welcome!</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: 45,
    fontWeight: '600',
    color: 'white',
  }
});
