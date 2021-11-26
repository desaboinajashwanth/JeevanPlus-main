import React, { Component } from 'react';
import { styles } from './DashboardComponent.styles';
import { View, ImageBackground, SafeAreaView } from 'react-native';
import { Title, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import TermsComponent from '../TermsComponent/TermsComponent';
import * as Constants from '../../Constants';

export default class DashboardComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  getStarted = () => {
    if (this.props.navigation) this.props.navigation.navigate('HealthInput');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TermsComponent />

        <ImageBackground
          source={require('../../assets/wave.png')}
          style={styles.image}
          resizeMode="cover">
          <View style={styles.headerContainer}>
            <Text style={{ color: 'white', fontSize: 15 }}>Hello, </Text>
            <Text
              style={{ color: 'white', fontSize: 25, fontWeight: 'normal' }}>
              welcome to {Constants.appTitle}
            </Text>
          </View>

          <View style={styles.bodyContainer}>
            <Title
              style={{
                color: 'white',
                fontSize: 25,
              }}>
              We can help to get you diet clean and healthy. Just scan you food
              before eating being healthy is that easy now.
            </Title>
          </View>

          <View
            style={{
              ...styles.bodyContainer,
              justifyContent: 'flex-end',
              marginTop: 40,
            }}>
            <Button
              mode="outlined"
              onPress={() => this.getStarted()}
              style={{
                padding: 5,
                roundness: 10,
                backgroundColor: '#68ca87',
                borderRadius: 25,
              }}>
              <Text style={{ color: 'white' }}>Let's Get Started </Text>
              <Icon name="arrow-right" color={'white'} size={17} />
            </Button>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
