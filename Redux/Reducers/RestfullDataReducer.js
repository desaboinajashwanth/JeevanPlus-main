const initialState = {
  textInputStateVariables: {
    age: null,
    weight: null,
  },
  gender: 'Male',
  pregnancyStatus: false,
  capturedImageUri: null,
};

export default restFullDataReducer = (state = initialState, action) => {
  return {...state};
};
