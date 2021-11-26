import React, { Component } from 'react';
import { styles } from './HealthPredection.styles';
import {
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import { Card, Text, Button, FAB, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FoodContentStatusComponent from '../FoodContentStatusComponent/FoodContentStatusComponent';
import connectToRedux from '../../_services/_reduxService';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import axios from 'axios';
import { DeviceConfig, ServerConfig } from '../../Constants';
import RNFS from 'react-native-fs';
import HealthPredictor from '../../_services/_predictionHelperService';
import {
  capatalizeText,
  cleanServerResponse,
} from '../../_services/_utilServices';
import * as Constants from '../../Constants';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MatCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HealthStatusComponent from '../HealthStatusComponent/HealthStatusComponent';
import FoodEffectsComponent from '../FoodEffectsComponent/FoodEffectsComponent';

class HealthPredection extends Component {
  SERVER_RESPONSE_DELAY = 0;

  constructor(props) {
    super(props);
    this.state = {
      base64ImageForServer: null,
      windowPercentHeight: Math.floor((55 / 100) * DeviceConfig.WINDOW_HEIGHT),
      capturedImageUri: null,
      hasError: false,
      isLoading: true,
      predictionReport: null,
      foodName: 'Identifying...',
      prediction: 'Predicting...',
      serverResponse: null,
    };
  }

  async getBase64(imageUri) {
    const filepath = imageUri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
    //return `data:image/jpeg;base64,${imageUriBase64}`;
    return `${imageUriBase64}`;
  }

  async componentDidMount() {
    const base64 = await this.getBase64(
      this.props.getSavedData().capturedImageUri,
    );

    this.setState({
      base64ImageForServer: base64,
      capturedImageUri: this.props.getSavedData().capturedImageUri,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.capturedImageUri !== this.state.capturedImageUri) {
      const base64 = await this.getBase64(
        this.props.getSavedData().capturedImageUri,
      );

      this.setState(
        {
          base64ImageForServer: base64,
          capturedImageUri: this.props.getSavedData().capturedImageUri,
        },
        () => this.sendImageToServer(),
      );
      console.log('In did Update');
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   HealthPredection.sendImageToServer(props);
  //   return {...state}
  // }

  getUserHealthInfo = () => {
    const {
      age,
      bodySugar,
      diastolicBloodPressure,
      gender,
      hasDaibeties,
      hasHighCholestrol,
      hasHypertension,
      height,
      pregnancyStatus,
      systolicBloodPressure,
      weight,
    } = this.props.getSavedData();
    return {
      age: parseInt(age),
      bodySugar: parseInt(bodySugar[0]),
      diastolicBloodPressure: parseInt(diastolicBloodPressure),
      gender,
      hasDaibeties,
      hasHighCholestrol,
      hasHypertension,
      height: parseInt(height),
      pregnancyStatus,
      systolicBloodPressure: parseInt(systolicBloodPressure),
      weight: parseInt(weight),
    };
  };

  createServerPayloadData = () => {
    const userHealthInfo = { ...this.getUserHealthInfo() };
    const serverPayloadData = {
      imageUri: this.state.base64ImageForServer,
      userData: userHealthInfo,
      expectedMacroNutrients: new HealthPredictor(
        null,
        userHealthInfo,
      ).getExpectedMacroNutrients(),
    };

    return serverPayloadData;
  };

  setErrorScreen = () => {
    this.setState({
      isLoading: false,
      hasError: true,
      predictionReport: null,
      foodName: 'Not found',
      prediction: 'No prediction',
    });
  };

  proccessServerData = serverResponse => {
    // const { age, gender, height, pregnancyStatus, weight } =
    //   this.props.getSavedData();

    // const userHealthInfo = {
    //   age,
    //   weight,
    //   pregnancyStatus,
    //   gender,
    //   height,
    // };

    const sample = new HealthPredictor(
      { ...serverResponse },
      this.getUserHealthInfo(),
    );

    console.log('n\n\n\n--------------- Server response -----------');

    /*    
    {
      "CALORIES":104,
      "CARBS":63,
      "CATEGORY":"carbs",
      "EFFECT_ON_BP":false,
      "EFFECT_ON_CHOL":false,
      "EFFECT_ON_PREGNANCY":false,
      "EFFECT_ON_SUGAR ":false,
      "FATS":33,
      "FOOD_NAME":"chapati",
      "PROTIEN":10,
      "SERVING_SIZE":false
    }
    */
    console.log(serverResponse);

    //console.log(this.props.getSavedData());

    //console.log('--------------- expected Nutrients -------------');
    //console.log(sample.getExpectedMacroNutrients());

    //console.log(this.createServerPayloadData());

    /*

    Saved Data
    { "age": "53", "bodySugar": [111], "
    capturedImageUri": "file:/
    app/cache/Camera/d0ab63ad-bfe4-490e-b60b-49a8135f0b97.jpg", 
    "diastolicBloodPressure": "55", "errorInAge": false, 
    "errorInDiastolicBloodPressure": false, "
    errorInHeight": false, "errorInSystolicBloodPressure": false, 
    "errorInWeight": false, "gender": "Male", 
    "hasAcceptedTermsAndConditions": true, 
    "hasDaibeties": false, "hasHighCholestrol": false, "
    hasHypertension": false, "height": "153", 
    "pregnancyStatus": false, "systolicBloodPressure": "120", 
    "weight": "88"}
    */

    /*
    {"CALORIES": 104, "CARBS": 63, "CATEGORY": "carbs", "EFFECT_ON_BP": false, "EFFECT_ON_CHOL": false, "EFFECT_ON_PREGNANCY": false, 
  "EFFECT_ON_SUGAR ": false, "FATS": 33, "FOOD_NAME": "chapati", "PROTIEN": 10, "SERVING_SIZE": false} 
    */
    const report = sample.getAnalysisReport();

    //console.log(report);

    if (serverResponse && report) {
      this.setState({
        isLoading: false,
        hasError: false,
        predictionReport: report,
        foodName: serverResponse[Constants.foodContentType.FOOD_NAME],
        prediction: report.prediction ?? 'No prediction',
        serverResponse,
      });
    } else {
      this.setErrorScreen();
    }
  };

  sendImageToHostedServer = hostedUrl => {
    axios({
      method: 'post',
      url: hostedUrl,
      data: this.createServerPayloadData(),
    })
      .then(response => {
        if (response && response['data']) {
          const responseData = response.data;
          console.log('---- cleaned data ------');
          console.log(cleanServerResponse(responseData));
          this.proccessServerData(cleanServerResponse(responseData));
        } else {
          this.setErrorScreen();
        }
      })
      .catch(err => this.setErrorScreen());
  };

  sendImageToServer = () => {
    this.setState({
      isLoading: true,
    });

    console.log('------- Server info ----------');
    console.log(`${ServerConfig.SERVER_IP}:${ServerConfig.PORT}/`);

    axios({
      method: 'get',
      url: `${ServerConfig.SERVER_IP}:${ServerConfig.PORT}/`,
    })
      .then(response => {
        console.log('------- HOSTED_URL--------');
        console.log(response['data']);
        if (response && response['data']) {
          this.sendImageToHostedServer(response['data']['HOSTED_URL']);
        } else {
          this.setErrorScreen();
        }
      })
      .catch(err => this.setErrorScreen());

    // const mockServerResponse = {
    //   [Constants.foodContentType.FOOD_NAME]: 'Itlian burger',
    //   [Constants.foodContentType.CALORIES]: 100,
    //   [Constants.foodContentType.PROTIEN]: 40,
    //   [Constants.foodContentType.FATS]: 10,
    //   [Constants.foodContentType.CARBS]: 10,
    // };

    // const sampleServer = new Promise(
    //   (resolve, reject) => resolve(mockServerResponse),
    //   // setTimeout(() => {

    //   // }, this.SERVER_RESPONSE_DELAY),
    // );

    // console.log('*********** cleaned data ***********');
    // console.log(cleanServerResponse(mockServerResponse));
    // this.proccessServerData(cleanServerResponse(mockServerResponse));
    // sampleServer
    //   .then(response => this.proccessServerData(response))
    //   .catch(err => this.setState({ hasError: true, isLoading: false }));
  };

  goToPrevoiusScreen = () => {
    if (this.props.navigation) this.props.navigation.goBack();
  };

  getErrorScreen() {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          paddingTop: '20%',
          flex: 1,
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <EntypoIcon name="emoji-sad" color="rgba(0,0,0,0.6)" size={50} />

        <Paragraph style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          Oops, I was unable to recognize that food
        </Paragraph>
      </View>
    );
  }

  getLoadingPlaceholder = () => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          paddingTop: '20%',
          flex: 1,
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <EntypoIcon name="open-book" color="rgba(0,0,0,0.6)" size={50} />

        <Paragraph style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          Studying the food
        </Paragraph>
      </View>
    );
  };

  getPredictionStatus = () => {
    const { expectedMacroNutrients, observedMacroNutrients } =
      this.state.predictionReport;

    console.log(this.state.predictionReport);
    return (
      <View style={{ ...styles.container, padding: 10 }}>
        <Title
          style={{
            marginTop: 10,
            marginBottom: 10,
            fontSize: 23,
            paddingHorizontal: 10,
          }}>
          Food's nutritional value{' '}
        </Title>
        <Paragraph style={{ paddingHorizontal: 10 }}>
          Below values are calculated by comparing the quantity of nutrients in
          the above food and expected daily in take of that nutrient.
        </Paragraph>

        <View>
          {Object.keys(observedMacroNutrients).map((key, index) => {
            return (
              <FoodContentStatusComponent
                key={index + '_macro_nutrient'}
                foodContentType={key}
                foodContentQuantityExpected={expectedMacroNutrients[key]}
                foodContentQuantityObserved={observedMacroNutrients[key]}
              />
            );
          })}
        </View>
      </View>
    );
  };

  getFoodHealthyStatusFabIconAndColor(healthinessLevel) {
    let iconName = 'check';
    let iconBackgroundColor = '#68ca87';

    if (healthinessLevel < 1) {
      iconName = 'warning';
      iconBackgroundColor = '#fa5353';
    } else if (healthinessLevel >= 1 && healthinessLevel <= 2) {
      iconName = 'warning';
      iconBackgroundColor = '#EC5800';
    } else if (healthinessLevel >= 2 && healthinessLevel <= 3) {
      iconName = 'like2';
      iconBackgroundColor = '#9acd32';
    } else {
      iconName = 'heart';
      iconBackgroundColor = '#68ca87';
    }

    return { iconName, iconBackgroundColor };
  }

  getFoodHealthyStatusFab = () => {
    const { predictionReport } = this.state;
    if (predictionReport) {
      const { healthinessLevel } = predictionReport;

      console.log('healthy ness weight -> ', healthinessLevel);
      console.log('Prediction report', predictionReport);

      let { iconName, iconBackgroundColor } =
        this.getFoodHealthyStatusFabIconAndColor(healthinessLevel);

      return (
        <AntDesignIcon
          name={iconName}
          color={'#fff'}
          size={25}
          style={{
            ...styles.foodHealthyStatusFab,
            backgroundColor: iconBackgroundColor,
          }}
        />
      );
    }
    return (
      <MatCommunityIcon
        name="brain"
        color={'#fff'}
        size={25}
        style={{
          ...styles.foodHealthyStatusFab,
          backgroundColor: '#008cef',
        }}
      />
    );
  };

  render() {
    const {
      windowPercentHeight,
      capturedImageUri,
      isLoading,
      hasError,
      foodName,
      prediction,
      predictionReport,
    } = this.state;
    return (
      <SafeAreaView>
        {isLoading && !hasError && <LoadingComponent />}
        <ScrollView
          style={{
            ...styles.container,
            backgroundColor: '#fff',
          }}>
          <View style={styles.imageWrapper}>
            <Image
              style={{
                width: '100%',
                height: windowPercentHeight,
              }}
              resizeMode="cover"
              source={
                capturedImageUri
                  ? { uri: capturedImageUri }
                  : require('../../assets/placeholder.png')
              }
            />
            <View style={{ ...styles.imgOverlay, height: windowPercentHeight }}>
              <FAB
                style={styles.backButton}
                small
                icon="arrow-left"
                color="white"
                onPress={() => this.goToPrevoiusScreen()}
              />

              <Card style={styles.foodNameCard}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                  }}>
                  {' '}
                  {capatalizeText(foodName)}{' '}
                </Text>
              </Card>

              <Card style={styles.foodHealthyStatusCard}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 17,
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    marginBottom: 8,
                  }}>
                  {capatalizeText(prediction)}{' '}
                </Text>
              </Card>

              {this.getFoodHealthyStatusFab()}
            </View>
          </View>
          {isLoading && !hasError && this.getLoadingPlaceholder()}

          {!isLoading && !hasError && (
            <HealthStatusComponent {...this.props.getSavedData()} />
          )}

          {!isLoading && !hasError && (
            <FoodEffectsComponent {...this.state.serverResponse} />
          )}

          {!isLoading && !hasError && this.getPredictionStatus()}

          {hasError && this.getErrorScreen()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default connectToRedux(HealthPredection);
