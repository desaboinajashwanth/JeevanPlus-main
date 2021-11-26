import {StyleSheet} from 'react-native';

const styleObject = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '90%',
    marginHorizontal: '5%',
    borderRadius: 17,
    height: '90%',
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
