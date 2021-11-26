import React, {Component} from 'react';
import {View, SafeAreaView, Image} from 'react-native';
import {styles} from './ImagePreviewComponent.styles';
import {Button, Text, Modal, Portal} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ImagePreviewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      capturedImageUri: null,
      isModalVisible: true,
    };
  }

  componentDidMount() {
    this.setState({capturedImageUri: this.props.capturedImageUri});
  }

  static getDerivedStateFromProps(props, state) {
    return {...state, ...props};
  }

  closeModal = () => {
    this.setState({isModalVisible: false}, this.props.closeImagePreview());
  };

  gotoPredictScreen = () => {
    this.closeModal();
    this.props.gotoPredictScreen();
  };

  render() {
    const {capturedImageUri, isModalVisible} = this.state;
    return (
      <>
        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={() => this.closeModal()}
            contentContainerStyle={{...styles.container}}>
            <View style={{flex: 1}}>
              <Image
                source={
                  capturedImageUri
                    ? {uri: capturedImageUri}
                    : require('../../assets/placeholder.png')
                }
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 4,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
            </View>
            <View style={{flex: 0.1, backgroundColor: '#68ca87'}}>
              <Button
                onPress={() => this.gotoPredictScreen()}
                style={{
                  backgroundColor: '#68ca87',
                  elevation: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}>
                <MaterialIcon name="check" color={'white'} size={22} />
              </Button>
            </View>
          </Modal>

          <View style={{...styles.previewImageControlPanel}}></View>
        </Portal>
      </>
    );
  }
}
