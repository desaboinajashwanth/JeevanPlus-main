import { StyleSheet } from 'react-native';



const styleObject = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  cameraControlPanel: {
    position: 'absolute',
    height: 80,
    backgroundColor: 'transparent',
    bottom: '5%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1,
  },
  panelControls: {
    backgroundColor: 'transparent',
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toPredictScreenFab: {
    margin: 0,
    backgroundColor: '#68ca87',
    elevation: 1,
  },

  backButton: {
    margin: 0,
    backgroundColor: '#008cef',
    elevation: 1,
  },
  uploadButton: {
    margin: 0,
    backgroundColor: '#3ac29e',
    elevation: 1,
  },
  topControlPanel: {
    flex: 1,
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '7%',
    paddingHorizontal: '5%',
  },
});

export const styles = StyleSheet.create(styleObject);
