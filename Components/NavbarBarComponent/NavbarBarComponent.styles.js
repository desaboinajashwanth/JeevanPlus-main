import {StyleSheet} from 'react-native';

const styleObject = {
  navbar: {
    flex: 1,
    padding: 22,
    paddingTop: 15,
    paddingBottom: 12,
    width: '100%',
    backgroundColor: 'rgba(35, 82, 185, 1)',
    elevation: 1,
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  placeholder: {
    height: "10%",
    padding: 20,
    width: '100%',
    backgroundColor: 'transparent',
    elevation: 0,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  }
};

export const styles = StyleSheet.create(styleObject);
