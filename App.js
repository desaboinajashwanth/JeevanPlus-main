/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardComponent from './Components/DashboardComponent/DashboardComponent';
import HealthInputComponent from './Components/HealthInputComponent/HealthInputComponent';
import HealthPredection from './Components/HealthPredection/HealthPredection';
import CameraComponent from './Components/CameraComponent/CameraComponent';
import connectToRedux from './_services/_reduxService';

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    text: '#3b3b3b',
  },
};

const DEBUG_MODE = !true;

const navigationStack = [
  {
    name: 'Dashboard',
    component: DashboardComponent,
    options: {headerShown: false},
  },
  {
    name: 'HealthInput',
    component: HealthInputComponent,
    options: {headerShown: false},
  },
  {
    name: 'CameraComponent',
    component: CameraComponent,
    options: {headerShown: false},
  },
  {
    name: 'HealthPredection',
    component: HealthPredection,
    options: {headerShown: false},
  },
];

const Stack = createNativeStackNavigator();

const getStartingScreenNumber = props => {
  if (props && props.getSavedData) {
    console.log(props.getSavedData());
    const {hasAcceptedTermsAndConditions} = props.getSavedData();
    console.log(+hasAcceptedTermsAndConditions);

    return !DEBUG_MODE ? +hasAcceptedTermsAndConditions : 0;
    return;
  }
  return 0;
};

const createScreens = (skipDashboard = false) => {
  let screensStack = [];
  let skippedDashboard = skipDashboard;
  let index = 1002;
  for (const screen of navigationStack) {
    if (skippedDashboard && !DEBUG_MODE) {
      skippedDashboard = false;
      continue;
    } else {
      screensStack.push(
        <Stack.Screen
          key={'screen_' + index}
          name={screen.name}
          component={screen.component}
          options={{...screen.options}}
        />,
      );

      index += 12;
    }
  }

  return [...screensStack];
};

const App: props => Node = props => {
  const initialScreenNumber = getStartingScreenNumber(props);

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        animated={true}
        backgroundColor="rgba(0,0,0,0)"
        translucent={true}
        hidden={false}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={navigationStack[initialScreenNumber].name}>
          {createScreens(initialScreenNumber)}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default connectToRedux(App);
