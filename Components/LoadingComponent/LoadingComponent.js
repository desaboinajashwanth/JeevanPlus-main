import React, {Component} from 'react';
import {View, Image, ImageBackground} from 'react-native';
import {styles} from './LoadingComponent.styles';
import {Text, Portal, ActivityIndicator} from 'react-native-paper';

export default function LoadingComponent(props) {
  return <>{props.splash ? getSplashScreen() : getLoadingScreen()}</>;
}

function getSplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#008cef',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1.2,
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Image source={require('../../assets/logo_no_bg.png')} style={{height:"26%", width:"17%"}} />
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}>
        <ActivityIndicator
          animating={true}
          color={'#fff'}
          small
          style={{paddingTop: '10%'}}
        />
      </View>
    </View>
  );
}

function getLoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator animating={true} color={'#003cbf'} size={'500'} />
      </View>
    </View>
  );
}
