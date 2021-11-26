import React, { PureComponent, Node } from 'react';
import { styles } from './HealthInputComponent.styles';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  HelperText,
  Divider,
} from 'react-native-paper';
import { Slider } from '@miblanchard/react-native-slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import connectToRedux from '../../_services/_reduxService';
import { appTitle, DeviceConfig } from '../../Constants';

class HealthInputComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      age: '55',
      errorInAge: !true,
      weight: '65.77',
      errorInWeight: !true,
      height: '154',
      errorInHeight: !true,

      systolicBloodPressure: '',
      errorInSystolicBloodPressure: true,

      diastolicBloodPressure: '',
      errorInDiastolicBloodPressure: true,

      gender: 'Male',

      pregnancyStatus: false,

      hasDaibeties: false,

      hasHighCholestrol: false,

      screenHeight: DeviceConfig.WINDOW_HEIGHT,

      bodySugar: 100,
    };
  }

  componentDidMount() {
    const savedInputData = this.props.getSavedData();
    if (savedInputData) {
      this.setState({ ...savedInputData });
    }
  }

  changeTextInputStateVariables = (stateVariable, updatedValue) => {
    if (stateVariable === 'age') {
      let errorInAge = /^[0-9]+$/.test(updatedValue);

      if (!errorInAge && updatedValue > 100) errorInAge = true;

      console.log(updatedValue);
      this.setState({
        [stateVariable]: updatedValue,
        errorInAge: !errorInAge,
      });
    }

    if (stateVariable === 'weight') {
      const errorInWeight = /^\d+(\.\d{1,2})?$/.test(updatedValue);
      this.setState(
        {
          [stateVariable]: updatedValue,
          errorInWeight: !errorInWeight,
        },
        () => console.log(this.state),
      );
    }

    if (stateVariable === 'systolicBloodPressure') {
      console.log('----------------');

      console.log('systolicBloodPressure', updatedValue);
      const errorInSystolicBloodPressure = /^\d+(\.\d{1,2})?$/.test(
        updatedValue,
      );
      this.setState(
        {
          [stateVariable]: updatedValue,
          errorInSystolicBloodPressure: !errorInSystolicBloodPressure,
        },
        () => console.log(this.state),
      );
    }

    if (stateVariable === 'diastolicBloodPressure') {
      const errorInDiastolicBloodPressure = /^\d+(\.\d{1,2})?$/.test(
        updatedValue,
      );
      this.setState(
        {
          [stateVariable]: updatedValue,
          errorInDiastolicBloodPressure: !errorInDiastolicBloodPressure,
        },
        () => console.log(this.state),
      );
    }

    if (stateVariable === 'height') {
      const errorInHeight = /^\d+(\.\d{1,2})?$/.test(updatedValue);
      this.setState(
        {
          [stateVariable]: updatedValue,
          errorInHeight: !errorInHeight,
        },
        () => console.log(this.state),
      );
    }
  };

  hasErrorIn = errorToCheckIn => {
    if (errorToCheckIn === 'weight') {
      return this.state.errorInWeight;
    }

    if (errorToCheckIn === 'height') {
      return this.state.errorInHeight;
    }

    if (errorToCheckIn === 'diastolicBloodPressure') {
      return this.state.errorInDiastolicBloodPressure;
    }

    if (errorToCheckIn === 'systolicBloodPressure') {
      return this.state.errorInSystolicBloodPressure;
    }

    return this.state.errorInAge;
  };

  hasHyperTension = () => {
    const { systolicBloodPressure, diastolicBloodPressure } = this.state;
    if (systolicBloodPressure && diastolicBloodPressure) {
      return (
        parseInt(systolicBloodPressure) > 130 &&
        parseInt(diastolicBloodPressure) > 80
      );
    }
    return false;
  };

  hasDaibeties = () => {
    const { bodySugar } = this.state;
    if (bodySugar && bodySugar.length === 1) return bodySugar[0] > 126;
    return false;
  };

  saveAnswersAndPopCamera = () => {
    const { saveInputData } = this.props;
    if (this.props.navigation) {
      if (
        saveInputData({
          ...this.state,
          hasHypertension: this.hasHyperTension(),
          hasDaibeties: this.hasDaibeties(),
        })
      )
        this.props.navigation.navigate('CameraComponent');
    }
  };

  setGenderTo = gender => {
    this.setState({ gender });
  };

  setPregnancyStatusTo = pregnancyStatus => {
    this.setState({ pregnancyStatus });
  };

  setHasDaibetiesTo = hasDaibeties => {
    this.setState({ hasDaibeties });
  };

  setHasHighCholestrolTo = hasHighCholestrol => {
    this.setState({ hasHighCholestrol });
  };

  allFieldsValid = () =>
    this.hasErrorIn('weight') === false &&
    this.hasErrorIn('age') === false &&
    this.hasErrorIn('height') === false &&
    this.hasErrorIn('diastolicBloodPressure') === false &&
    this.hasErrorIn('systolicBloodPressure') === false;

  getSectionHeader = (title, titleIcon) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        marginBottom: '9%',
      }}>
      <Title
        style={{
          fontSize: 20,
          color: 'rgba(0,0,0,0.5)',
          marginBottom: '3%',
        }}>
        {titleIcon ?? ''} {title}
      </Title>
      <Divider
        style={{
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.55)',
        }}
      />
    </View>
  );
  render() {
    const {
      screenHeight,
      gender,
      pregnancyStatus,
      hasDaibeties,
      hasHighCholestrol,
    } = this.state;

    const minScreenPercentageToCover = 35;

    if (screenHeight)
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground
            source={require('../../assets/IconGrid.png')}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}>
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
              <ScrollView
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  evevation: 2,
                }}>
                <View
                  style={{
                    height: (minScreenPercentageToCover * screenHeight) / 100,
                    backgroundColor: 'transparent',
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      ...styles.container,
                      backgroundColor: 'transparent',
                      paddingTop: 30,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    {/* <Icon name="food-croissant" size={33} color={'#fff'} /> */}
                    <Image
                      source={require('../../assets/logo_no_bg.png')}
                      style={{ height: '80%', width: '7%' }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 22,
                        fontStyle: 'italic',
                        marginTop: '5%',
                      }}>
                      {appTitle}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.container,
                      backgroundColor: 'transparent',
                      paddingVertical: '15%',
                    }}>
                    <Title
                      style={{
                        fontSize: 30,
                        color: '#fff',
                        fontWeight: '100',
                      }}>
                      Dashboard
                    </Title>
                    <Paragraph style={{ color: '#fff', fontWeight: '100' }}>
                      {' '}
                      Help us to know you better.{' '}
                    </Paragraph>
                  </View>
                </View>

                {/* Age question*/}
                <View
                  style={{
                    ...styles.container,
                    ...styles.bodyCard,
                  }}>
                  <View
                    style={{
                      ...styles.container,
                      marginHorizontal: 20,
                      paddingHorizontal: 0,
                    }}>
                    {this.getSectionHeader(
                      'Personal details',
                      <AntDesignIcon name="user" icon="user" size={21} />,
                    )}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginBottom: 25,
                      }}>
                      <Title style={{ fontSize: 16 }}>
                        Q. What is your age ?
                      </Title>
                      <TextInput
                        mode="outlined"
                        outlineColor="#008cef"
                        placeholder="Enter your age..."
                        keyboardType="numeric"
                        style={{ marginTop: 10 }}
                        right={<TextInput.Affix text="Years" />}
                        value={this.state.age}
                        onChangeText={text =>
                          this.changeTextInputStateVariables('age', text)
                        }
                      />
                      <HelperText type="error" visible={this.hasErrorIn('age')}>
                        Enter a valid Age !
                      </HelperText>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginBottom: 25,
                        marginTop: 15,
                      }}>
                      <Title style={{ fontSize: 16 }}>
                        Q. What is your weight ?
                      </Title>
                      <TextInput
                        mode="outlined"
                        outlineColor="#008cef"
                        placeholder="Enter your weight..."
                        keyboardType="numeric"
                        style={{ marginTop: 10 }}
                        right={<TextInput.Affix text="Kg's" />}
                        value={this.state.weight}
                        onChangeText={text =>
                          this.changeTextInputStateVariables('weight', text)
                        }
                      />
                      <HelperText
                        type="error"
                        visible={this.hasErrorIn('weight')}>
                        Enter a valid Weight !
                      </HelperText>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginBottom: 25,
                        marginTop: 15,
                      }}>
                      <Title style={{ fontSize: 16 }}>
                        Q. What is your height ?
                      </Title>
                      <TextInput
                        mode="outlined"
                        outlineColor="#008cef"
                        placeholder="Enter your height..."
                        keyboardType="numeric"
                        style={{ marginTop: 10 }}
                        right={<TextInput.Affix text="cm" />}
                        value={this.state.height}
                        onChangeText={text =>
                          this.changeTextInputStateVariables('height', text)
                        }
                      />
                      <HelperText
                        type="error"
                        visible={this.hasErrorIn('height')}>
                        Enter a valid Height !
                      </HelperText>
                    </View>

                    {/* Systolic and diastolic bp */}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginBottom: 25,
                        marginTop: 15,
                      }}>
                      <Title style={{ fontSize: 16 }}>
                        Q. Please enter your systolic and diastolic blood
                        pressure
                      </Title>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{ flex: 0.48 }}>
                          <TextInput
                            mode="outlined"
                            outlineColor="#008cef"
                            placeholder="Systolic.."
                            keyboardType="numeric"
                            style={{ marginTop: 10, flex: 0.48 }}
                            right={<TextInput.Affix text="mmHg" />}
                            value={this.state.systolicBloodPressure}
                            onChangeText={text =>
                              this.changeTextInputStateVariables(
                                'systolicBloodPressure',
                                text,
                              )
                            }
                          />
                          <HelperText
                            type="error"
                            visible={this.hasErrorIn('systolicBloodPressure')}>
                            Enter a valid value !
                          </HelperText>
                        </View>

                        <View style={{ flex: 0.48 }}>
                          <TextInput
                            mode="outlined"
                            outlineColor="#008cef"
                            placeholder="Diastolic.."
                            keyboardType="numeric"
                            style={{ marginTop: 10 }}
                            right={<TextInput.Affix text="mmHg" />}
                            value={this.state.diastolicBloodPressure}
                            onChangeText={text =>
                              this.changeTextInputStateVariables(
                                'diastolicBloodPressure',
                                text,
                              )
                            }
                          />
                          <HelperText
                            type="error"
                            visible={this.hasErrorIn('diastolicBloodPressure')}>
                            Enter a valid value !
                          </HelperText>
                        </View>
                      </View>
                    </View>

                    {/* Gender question*/}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginBottom: gender === 'Female' ? 20 : '20%',
                        marginTop: 15,
                      }}>
                      <Title style={{ fontSize: 16 }}>
                        Q. What is you gender ?
                      </Title>
                      <View
                        style={{
                          ...styles.container,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginTop: 20,
                          alignItems: 'center',
                        }}>
                        <Card
                          style={{
                            ...styles.selectionCard,
                            marginRight: 20,
                            borderColor:
                              gender === 'Male' ? '#008cef' : 'transparent',
                            backgroundColor:
                              gender === 'Male'
                                ? 'rgba(0,140,239,0.05)'
                                : 'transparent',
                          }}
                          onPress={() => this.setGenderTo('Male')}>
                          <Card.Content
                            style={{ flex: 1, alignItems: 'center' }}>
                            <Title>
                              <Icon
                                name="gender-male"
                                size={35}
                                color="#008cef"
                              />
                            </Title>
                            <Paragraph style={{ marginTop: 15 }}>
                              Male
                            </Paragraph>
                          </Card.Content>
                        </Card>
                        <Card
                          style={{
                            ...styles.selectionCard,
                            marginLeft: 20,
                            borderColor:
                              gender === 'Female' ? '#fc6c85' : 'transparent',

                            backgroundColor:
                              gender === 'Female'
                                ? 'rgba(252,108,133, 0.05)'
                                : 'transparent',
                          }}
                          onPress={() => this.setGenderTo('Female')}>
                          <Card.Content
                            style={{ flex: 1, alignItems: 'center' }}>
                            <Title>
                              <Icon
                                name="gender-female"
                                size={35}
                                color="#fc6c85"
                              />
                            </Title>
                            <Paragraph style={{ marginTop: 15 }}>
                              Female
                            </Paragraph>
                          </Card.Content>
                        </Card>
                      </View>
                    </View>

                    {/* Concieved question*/}

                    {gender === 'Female' && (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          marginBottom: '20%',
                          marginTop: 50,
                        }}>
                        <Title style={{ fontSize: 16 }}>
                          Q. What is your pregnancy status ?
                        </Title>
                        <View
                          style={{
                            ...styles.container,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: 15,
                            alignItems: 'center',
                          }}>
                          <Card
                            style={{
                              ...styles.selectionCard,
                              marginRight: 20,
                              borderColor: pregnancyStatus
                                ? '#68ca87'
                                : 'transparent',
                              backgroundColor: pregnancyStatus
                                ? 'rgba(104,202,135, 0.05)'
                                : 'transparent',
                            }}
                            onPress={() => this.setPregnancyStatusTo(true)}>
                            <Card.Content
                              style={{ flex: 1, alignItems: 'center' }}>
                              <Title>
                                <Icon name="plus" size={35} color="#68ca87" />
                              </Title>
                              <Paragraph style={{ marginTop: 15 }}>
                                Positive
                              </Paragraph>
                            </Card.Content>
                          </Card>
                          <Card
                            style={{
                              ...styles.selectionCard,
                              marginLeft: 20,
                              borderColor: !pregnancyStatus
                                ? '#fa5353'
                                : 'transparent',

                              backgroundColor: !pregnancyStatus
                                ? 'rgba(250,83,83,0.05)'
                                : 'transparent',
                            }}
                            onPress={() => this.setPregnancyStatusTo(false)}>
                            <Card.Content
                              style={{ flex: 1, alignItems: 'center' }}>
                              <Title>
                                <Icon name="minus" size={35} color="#fa5353" />
                              </Title>
                              <Paragraph style={{ marginTop: 15 }}>
                                Negative
                              </Paragraph>
                            </Card.Content>
                          </Card>
                        </View>
                      </View>
                    )}

                    {this.getSectionHeader(
                      'Health details',
                      <AntDesignIcon
                        name="medicinebox"
                        icon="medicinebox"
                        size={21}
                      />,
                    )}

                    {/* Diabeties question */}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginBottom: 10,
                        marginTop: 0,
                      }}>
                      <Title style={{ fontSize: 16 }}>
                        Q. How much is you body sugar ?
                      </Title>
                      <View
                        style={{
                          ...styles.container,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginTop: 20,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'stretch',
                            justifyContent: 'center',
                            marginTop: '2%',
                          }}>
                          <Slider
                            animateTransitions={true}
                            step={1}
                            maximumValue={500}
                            minimumValue={20}
                            trackStyle={{
                              height: '140%',
                              borderRadius: 8,
                              width: '100%',
                            }}
                            maximumTrackTintColor="rgba(0,140,239,0.05)"
                            minimumTrackTintColor="rgba(0,140,239,0.65)"
                            thumbStyle={{ height: 0, width: 0 }}
                            value={this.state.bodySugar}
                            onValueChange={value =>
                              this.setState({ bodySugar: value })
                            }
                          />
                          <Paragraph style={{ marginTop: '5%' }}>
                            Body Sugar:{' '}
                            <Text style={{ color: '#004062' }}>
                              {this.state.bodySugar} mg/dL
                            </Text>
                          </Paragraph>
                        </View>
                        {/* <Card
                          style={{
                            ...styles.selectionCard,
                            marginRight: 20,
                            borderColor: hasDaibeties
                              ? '#e5ad48'
                              : 'transparent',
                            backgroundColor: hasDaibeties
                              ? 'rgba(229, 173, 72, 0.05)'
                              : 'transparent',
                          }}
                          onPress={() => this.setHasDaibetiesTo(true)}>
                          <Card.Content
                            style={{ flex: 1, alignItems: 'center' }}>
                            <Title>
                              <Icon name="check" size={35} color="#e5ad48" />
                            </Title>
                            <Paragraph style={{ marginTop: 15 }}>Yes</Paragraph>
                          </Card.Content>
                        </Card>
                        <Card
                          style={{
                            ...styles.selectionCard,
                            marginLeft: 20,
                            borderColor: !hasDaibeties
                              ? '#e5ad48'
                              : 'transparent',
                            backgroundColor: !hasDaibeties
                              ? 'rgba(229, 173, 72, 0.05)'
                              : 'transparent',
                          }}
                          onPress={() => this.setHasDaibetiesTo(false)}>
                          <Card.Content
                            style={{ flex: 1, alignItems: 'center' }}>
                            <Title>
                              <Icon name="close" size={35} color="#e5ad48" />
                            </Title>
                            <Paragraph style={{ marginTop: 15 }}>No</Paragraph>
                          </Card.Content>
                        </Card> */}
                      </View>
                    </View>

                    {/* High cholestrol question */}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginBottom: 20,
                        marginTop: 50,
                      }}>
                      <Title style={{ fontSize: 16 }}>
                        Q. Do you have high cholestrol ?
                      </Title>
                      <View
                        style={{
                          ...styles.container,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginTop: 15,
                          alignItems: 'center',
                        }}>
                        <Card
                          style={{
                            ...styles.selectionCard,
                            marginRight: 20,
                            borderColor: hasHighCholestrol
                              ? '#655eb0'
                              : 'transparent',
                            backgroundColor: hasHighCholestrol
                              ? 'rgba(101, 94, 176, 0.05)'
                              : 'transparent',
                          }}
                          onPress={() => this.setHasHighCholestrolTo(true)}>
                          <Card.Content
                            style={{ flex: 1, alignItems: 'center' }}>
                            <Title>
                              <Icon name="check" size={35} color="#655eb0" />
                            </Title>
                            <Paragraph style={{ marginTop: 15 }}>Yes</Paragraph>
                          </Card.Content>
                        </Card>
                        <Card
                          style={{
                            ...styles.selectionCard,
                            marginLeft: 20,
                            borderColor: !hasHighCholestrol
                              ? '#655eb0'
                              : 'transparent',

                            backgroundColor: !hasHighCholestrol
                              ? 'rgba(101, 94, 176, 0.05)'
                              : 'transparent',
                          }}
                          onPress={() => this.setHasHighCholestrolTo(false)}>
                          <Card.Content
                            style={{ flex: 1, alignItems: 'center' }}>
                            <Title>
                              <Icon name="close" size={35} color="#655eb0" />
                            </Title>
                            <Paragraph style={{ marginTop: 15 }}>No</Paragraph>
                          </Card.Content>
                        </Card>
                      </View>
                    </View>

                    <View style={{ paddingBottom: '17%' }}></View>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    width: '100%',
                  }}>
                  <Button
                    mode="contained"
                    style={{
                      padding: 5,
                      paddingVertical: '4%',
                      elevation: 4,
                      backgroundColor: !this.allFieldsValid()
                        ? '#ececec'
                        : '#008cef',
                      width: DeviceConfig.WINDOW_WIDTH,
                      borderRadius: 0,
                    }}
                    disabled={!this.allFieldsValid()}
                    onPress={() => this.saveAnswersAndPopCamera()}>
                    {' '}
                    Open Camera <Icon name="camera" color="white" size={15} />
                  </Button>
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </SafeAreaView>
      );

    return null;
  }
}

export default connectToRedux(HealthInputComponent);
