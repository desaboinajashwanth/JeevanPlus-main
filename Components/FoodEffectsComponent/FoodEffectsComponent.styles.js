import { StyleSheet } from 'react-native';

const bodyCardRadius = 30;

const styleObject = {
  container: {
    height: '100%',
    width: '100%',
  },
  healthStatusCard: {
    elevation: 0,
    marginBottom: '4%',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export const styles = StyleSheet.create(styleObject);
