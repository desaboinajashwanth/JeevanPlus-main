import {StyleSheet} from 'react-native';

const styleObject = {
  container: {
    flex: 1,
    paddingHorizontal: 1,
    marginTop: '6%',
  },
  statusCard: {
    borderRadius: 70,
    elevation: 0,
    borderLeftWidth: 0,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: '8%',
    marginTop: "10%"
  },
};

export const styles = StyleSheet.create(styleObject);
