import {StyleSheet} from 'react-native';

const styleObject = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    elevation: 1,
    height: '100%',
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  spinnerWrapper: {
    backgroundColor: '#eef2f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 17,
    elevation: 2,
  },
});

export const styles = StyleSheet.create(styleObject);
