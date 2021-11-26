import {StyleSheet} from 'react-native';

const styleObject = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingTop: 0,
    marginTop: 0,
  },
  headerContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    paddingTop: 35
  },

  bodyContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 30,
    textAlign: "left"
  },
};

export const styles = StyleSheet.create(styleObject);
