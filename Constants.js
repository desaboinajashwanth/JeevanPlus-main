import { Dimensions } from 'react-native';

export const foodContentType = Object.freeze({
  FOOD_NAME: 'FOOD_NAME',
  PROTIEN: 'PROTIEN',
  FATS: 'FATS',
  CARBS: 'CARBS',
  CALORIES: 'CALORIES',
});

export const appTitle = 'JeevanPlus';

export const genderType = Object.freeze({
  MALE: 'Male',
  FEMALE: 'Female',
});

export const ServerConfig = Object.freeze({
  SERVER_IP: 'http://10.0.2.2',
  PORT: '9001',
});

export const DeviceConfig = Object.freeze({
  WINDOW_HEIGHT: Dimensions.get('window').height,
  WINDOW_WIDTH: Dimensions.get('window').width,
});

export const HealthStatusMessages = Object.freeze({
  isDiabetic: {
    title: 'Diabeties detected',
    body: 'Also known as high blood glucose',
  },

  hasHypertension: {
    title: 'High BP detected',
    body: 'Also known as hypertension ',
  },
});