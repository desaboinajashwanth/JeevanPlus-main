import {createStore, combineReducers, applyMiddleware} from 'redux';
import inputDataReducer from './Reducers/InputDataReducers';
import restFullDataReducer from './Reducers/RestfullDataReducer';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['capturedImageUri'],
};

const allReducers = combineReducers({
  inputDataReducer: persistReducer(persistConfig, inputDataReducer),
  restFullDataReducer,
});

const rootReducer = (state, props) => allReducers(state, props);

export const Store = createStore(rootReducer, applyMiddleware(thunk));

export const Persist = persistStore(Store);
