import React, {Component} from 'react';
import {View, ScrollView, Pressable} from 'react-native';
import {styles} from './TermsComponent.styles';
import {
  Button,
  Text,
  Modal,
  Portal,
  Title,
  Paragraph,
  Checkbox,
} from 'react-native-paper';
import OctIcons from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import connectToRedux from '../../_services/_reduxService';

class TermsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      IsModalVisible: true,
    };
  }

  componentDidMount() {
    const savedData = this.props.getSavedData();
    if (savedData) {
      this.setState({
        IsModalVisible: !savedData.hasAcceptedTermsAndConditions,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {...state, ...props};
  }

  closeModal = () => {
    this.setState({IsModalVisible: false});
  };

  toggleCheckBox = () => {
    this.setState((state, props) => ({checked: !state.checked}));
  };

  acceptedTermsAndConditions = () => {
    if (this.props.saveInputData({hasAcceptedTermsAndConditions: true}))
      this.closeModal();
  };
  render() {
    const {checked, IsModalVisible} = this.state;
    return (
      <>
        <Portal>
          <Modal
            visible={IsModalVisible}
            contentContainerStyle={{...styles.container}}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 0.1,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  backgroundColor: '#ececec',
                }}>
                <Title style={{fontWeight: 'normal', fontSize: 17}}>
                  <OctIcons name="book" size={18} /> Terms and Conditions{' '}
                </Title>
              </View>
              <View style={{flex: 1}}>
                <ScrollView>
                  <Paragraph
                    style={{textAlign: 'justify', paddingHorizontal: 20}}>
                    {'\n'}
                    {'\t\t\t\t'}The app will need access to your smartphone’s
                    hardware, specifically its storage, camera and network
                    connection. The storage will be used in order to generally
                    save the data you submit, such as basically your age,
                    weight, gender, and so on, on fairly your smartphone ‘s
                    storage, which will be used to calculate the daily required
                    intake of the food nutrients for your profile and compare to
                    the analyzed nutrients in food you photographed. The camera
                    will be used by you for taking photographs of the food item
                    you specifically want to test to really see if it actually
                    is fairly good for you or no in a subtle way. The app will
                    also require network connection in order to submit the
                    clicked food image to the server and get the analysis result
                    which will be used by the app to find out the health
                    information from the food .No image that you take with your
                    smartphone is stored on the server. Accepting the following
                    conditions indicates that you have given the app permission
                    to access the aforementioned objects on your device and
                    store the information you supplied. The app's predictions
                    should not be taken as completely accurate or factual, and
                    it should only be used for educational and recreational
                    purposes.
                  </Paragraph>

                  <Pressable
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginTop: 20,
                      marginBottom: 15,
                      alignItems: 'center',
                      paddingHorizontal: 15,
                    }}
                    onPress={() => this.toggleCheckBox()}>
                    <Checkbox status={checked ? 'checked' : 'unchecked'} />
                    <Paragraph> I accept the terms and conditions </Paragraph>
                  </Pressable>
                </ScrollView>
              </View>
            </View>
            <View
              style={{
                flex: 0.1,
                backgroundColor: !checked ? '#ececec' : '#68ca87',
              }}>
              <Button
                disabled={!checked}
                onPress={() => this.acceptedTermsAndConditions()}
                style={{
                  backgroundColor: !checked ? '#ececec' : '#68ca87',
                  elevation: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}>
                <MaterialIcon
                  name="check"
                  color={!checked ? '#000' : '#fff'}
                  size={22}
                />
              </Button>
            </View>
          </Modal>

          <View style={{...styles.previewImageControlPanel}}></View>
        </Portal>
      </>
    );
  }
}

export default connectToRedux(TermsComponent);