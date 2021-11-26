import React, {Component} from 'react';
import {styles} from './NavbarBarComponent.styles';
import {Text, View} from 'react-native';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class NavbarBarComponent extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('rgba(35, 82, 185, 1)');
  }

  render() {
    return (
      <>
        <View style={styles.navbar}>
          <Text style={{color: 'white', fontSize: 22, fontStyle: 'italic'}}>
            <Icon name="food-apple" size={25} color={'#fff'} /> Healthy me
          </Text>
        </View>
        <View style={styles.placeholder}>
          <Text style={{color: 'transparent', fontSize: 22, fontStyle: 'italic'}}>
            <Icon name="ramen_dining" size={25} color={'transparent'} /> Healthy me
          </Text>
        </View>
      </>
    );
  }
}
