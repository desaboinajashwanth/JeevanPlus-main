import {connect} from 'react-redux';
import Actions from '../Redux/Actions';

// const mapStateToProps = state => ({
//   getSavedData: () => state.inputDataReducer,
// });
// const mapDispatchToProps = dispatch => ({
//   saveInputData: dataToBeSaved =>
//     dispatch({type: Actions.UPDATE_SAVED_DATA, payload: dataToBeSaved}),
// });

// const mapDispatchToProps = dispatch => ({
//   saveInputData: dataToBeSaved =>
//     dispatch({type: Actions.UPDATE_SAVED_DATA, payload: dataToBeSaved}),
// });

function getMapStateToProps(needsRestFullReducer = false) {
  return state => ({
    getSavedData: () => state.inputDataReducer,
  });
}

function getMapDispatchToProps(needsRestFullReducer = false) {
  return dispatch => ({
    saveInputData: dataToBeSaved =>
      dispatch({type: Actions.UPDATE_SAVED_DATA, payload: dataToBeSaved}),
  });
}

const connectToRedux = (componentToConnect, needsRestFullReducer = false) =>
  connect(getMapStateToProps(), getMapDispatchToProps())(componentToConnect);

export default connectToRedux;
