import {StyleSheet} from 'react-native';

const bodyCardRadius = 30;

const styleObject = {
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 0,
    color: '#3b3b3b',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  bodyCard: {
    elevation: 4,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    paddingTop: 40,
    borderTopRightRadius: bodyCardRadius,
    borderTopLeftRadius: bodyCardRadius,
  },
  selectionCard: {
    flex: 0.8,
    alignItems: 'center',
    elevation: 0,
    borderRadius: 20,
    borderColor: "transparent",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingTop: 0,
    marginTop: 0,
    shadowColor: 'transparent',
  },
  imgOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    top: 0,
    height: 170,
    elevation: 1,
    width: '100%',
    shadowColor: 'transparent',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-around',
    textAlign: 'left',
  },
  column: {
    flex: 0.45,
    flexDirection: 'column',
    elevation: 0,
  },
  card: {
    flex: 0.45,
    justifyContent: 'space-around',
    textAlign: 'center',
    elevation: 0,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6a35ff',
    elevation: 1,
  },
};

export const styles = StyleSheet.create(styleObject);
