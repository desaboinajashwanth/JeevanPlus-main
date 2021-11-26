import Actions from '../Actions';

const initialState = {
  age: null,
  errorInAge: true,
  weight: null,
  errorInWeight: true,
  height: null,
  errorInHeight: true,
  gender: 'Male',
  pregnancyStatus: false,
  capturedImageUri: null,
  hasAcceptedTermsAndConditions: false,

  systolicBloodPressure: '',
  errorInSystolicBloodPressure: true,

  diastolicBloodPressure: '',
  errorInDiastolicBloodPressure: true,

  hasDaibeties: false,
  hasHighCholestrol: false,

  hasHypertension: false,

  bodySugar: 100,
};

const checkAndUpdateState = (state, incommingInputData) => {
  let newState = { ...state };
  for (const [key, value] of Object.entries(incommingInputData)) {
    if (state[key] !== void 0 && (state[key] === null || value !== state[key]))
      newState[key] = value;
  }
  console.log(newState);
  return { ...newState };
};

const deleteSelectedData = (state, attributesToDelete) => {
  let newState = { ...state };
  if (attributesToDelete instanceof Object) {
    for (key of attributesToDelete) {
      if (state[key]) {
        newState[key] = null;
      }
    }
  }
  if (attributesToDelete instanceof string) newState[attributesToDelete] = null;
  return { ...newState };
};

export default inputDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SAVED_DATA:
      return { ...state };

    case Actions.UPDATE_SAVED_DATA:
      return action['payload']
        ? { ...checkAndUpdateState(state, action.payload) }
        : { ...state };

    case Actions.DELETE_SAVED_DATA:
      return action['payload']
        ? { ...deleteSelectedData(state, action.payload) }
        : { ...initialState };

    default:
      return { ...state };
  }
};
