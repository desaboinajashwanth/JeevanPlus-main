import {StyleSheet} from 'react-native';

const styleObject = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '80%',
    marginHorizontal: '10%',
    borderRadius: 17,
    height: '70%',
    position: 'absolute',
    top: '5%',
    overflow: 'hidden',
  },
  previewImageControlPanel: {
    width: '100%',
    backgroundColor: 'yellow',
  },
});

export const styles = StyleSheet.create(styleObject);
