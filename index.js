/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';
import {Provider as ReduxProvider} from 'react-redux';
import {Store, Persist} from './Redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {Title} from 'react-native-paper';
import LoadingComponent from './Components/LoadingComponent/LoadingComponent';

function ReduxWrappedApp() {
  return (
    <ReduxProvider store={Store}>
      <PersistGate loading={<LoadingComponent splash />} persistor={Persist}>
        <App />
      </PersistGate>
    </ReduxProvider>
  );
}

AppRegistry.registerComponent(appName, () => ReduxWrappedApp);
