import React, { Component } from 'react';
import { styles } from './CameraComponent.styles';
import { RNCamera } from 'react-native-camera';
import { Text, FAB } from 'react-native-paper';
import { View, Pressable, Image, SafeAreaView, Vibration } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePreviewComponent from '../ImagePreviewComponent/ImagePreviewComponent';
import connectToRedux from '../../_services/_reduxService';
import { DeviceConfig } from '../../Constants';
import { launchImageLibrary } from 'react-native-image-picker';

class CameraClassComponent extends Component {
  options = {
    title: 'Select Image',
    mediaType: 'photo',
    quality: 0.5,
  };

  constructor(props) {
    super(props);

    this.state = {
      screenWidth: null,
      flashMode: RNCamera.Constants.FlashMode.off,
      capturedImageUri: null,
      isModalVisible: false,
      capturedImageData: null,
    };
  }

  componentDidMount() {
    this.setState({ screenWidth: DeviceConfig.WINDOW_WIDTH });
  }

  static getDerivedStateFromProps(props, state) {
    return { isFocused: props.isFocused };
  }

  toggleFlash = () => {
    this.setState((state, props) => ({
      flashMode:
        state.flashMode === RNCamera.Constants.FlashMode.on
          ? RNCamera.Constants.FlashMode.off
          : RNCamera.Constants.FlashMode.on,
    }));
  };

  saveImageToState = imageData => {
    Vibration.vibrate(30);
    this.setState((state, props) => ({
      capturedImageUri: imageData.uri,
      isModalVisible: true,
    }));
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: !true };
      this.camera
        .takePictureAsync(options)
        .then(response => this.saveImageToState(response))
        .catch(err => console.log(err));
    }
  };

  showImagePreview = () => {
    this.setState({ isModalVisible: true });
  };

  closeImagePreview = () => {
    this.setState({ isModalVisible: false });
  };

  gotoPredictScreen = () => {
    if (this.props.navigation) {
      if (
        this.props.getSavedData()['age'] &&
        this.props.getSavedData()['weight']
      ) {
        if (
          this.props.saveInputData({
            capturedImageUri: this.state.capturedImageUri,
          })
        )
          this.props.navigation.navigate('HealthPredection');
      } else this.props.navigation.goBack();
    }
  };

  goToPrevoiusScreen = () => {
    if (this.props.navigation) this.props.navigation.goBack();
  };

  pickImageFromGallery = () => {
    launchImageLibrary(this.options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      }
      if (res['assets'] && res['assets'][0] && res['assets'][0]['uri'])
        this.saveImageToState(res['assets'][0]);
    });
  };

  render() {
    const {
      screenWidth,
      flashMode,
      capturedImageUri,
      isModalVisible,
      isFocused,
    } = this.state;

    if (screenWidth && isFocused)
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          {capturedImageUri && (
            <ImagePreviewComponent
              capturedImageUri={capturedImageUri}
              isModalVisible={isModalVisible}
              closeImagePreview={this.closeImagePreview}
              gotoPredictScreen={this.gotoPredictScreen}
            />
          )}

          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              captureAudio={false}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={flashMode}
              autoFocus={true}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />

            {/* <View style={{flex: 1, backgroundColor: 'transparent'}}></View> */}

            <TopControlPanel
              {...this.props}
              capturedImageUri={capturedImageUri}
              gotoPredictScreen={this.gotoPredictScreen}
              goToPrevoiusScreen={this.goToPrevoiusScreen}
              pickImageFromGallery={this.pickImageFromGallery}
            />

            <View style={{ ...styles.cameraControlPanel, width: screenWidth }}>
              <View style={{ ...styles.panelControls }}>
                <Pressable onPress={() => this.toggleFlash()}>
                  <MaterialIcon
                    name={
                      flashMode ? 'lightning-bolt' : 'lightning-bolt-outline'
                    }
                    color={'rgba(255,255,255,1)'}
                    size={35}
                  />
                </Pressable>
              </View>
              <View style={{ ...styles.panelControls, flex: 0.5 }}>
                <Pressable onPress={() => this.takePicture()}>
                  <Icon name="circle" color={'rgba(255,255,255,1)'} size={80} />
                </Pressable>
              </View>

              <Pressable
                onPress={() => this.showImagePreview()}
                style={{
                  ...styles.panelControls,
                  backgroundColor: 'transparent',
                }}>
                <Image
                  source={
                    capturedImageUri
                      ? { uri: capturedImageUri }
                      : require('../../assets/placeholder.png')
                  }
                  style={{ height: '70%', width: '70%', borderRadius: 4 }}
                />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      );

    return null;
  }
}

function CameraComponent(props) {
  if (props.getSavedData()['age'] && props.getSavedData()['weight'])
    return <CameraClassComponent {...props} isFocused={useIsFocused()} />;
  else props.navigation.goBack();
}

function TopControlPanel(props) {
  return (
    <>
      <View style={{ ...styles.topControlPanel }}>
        {props.capturedImageUri ? (
          <FAB
            style={styles.toPredictScreenFab}
            small
            icon="check"
            color={'#fff'}
            onPress={() => props.gotoPredictScreen()}
          />
        ) : (
          <FAB
            style={{
              ...styles.toPredictScreenFab,
              backgroundColor: 'transparent',
              elevation: 0,
            }}
            small
            color={'transparent'}
          />
        )}

        <FAB
          style={styles.uploadButton}
          small
          icon="upload-outline"
          color="white"
          onPress={() => props.pickImageFromGallery()}
        />

        <FAB
          style={styles.backButton}
          small
          icon="arrow-left"
          color="white"
          onPress={() => props.goToPrevoiusScreen()}
        />
      </View>
    </>
  );
}

export default connectToRedux(CameraComponent);
