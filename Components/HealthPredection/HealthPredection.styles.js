import { StyleSheet } from 'react-native';

const bodyCardRadius = 30;

const imageTopElementsPosition = 10;

const styleObject = {
  container: {
    height: '100%',
    width: '100%',
  },
  imageWrapper: {
    flex: 1,
    borderBottomRightRadius: bodyCardRadius,
    borderBottomLeftRadius: bodyCardRadius,
    overflow: 'hidden',
    elevation: 2,
  },
  imgOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    top: 0,
    elevation: 1,
    width: '100%',
    shadowColor: 'rgba(0,0,0,0)',
  },
  column: {
    flex: 1,
    flexDirection: 'row',
  },
  backButton: {
    backgroundColor: '#008cef',
    position: 'absolute',
    elevation: 1,
    top: `${imageTopElementsPosition}%`,
    left: '5%',
  },
  foodHealthyStatusFab: {
    backgroundColor: '#ffe598',
    color: '#fff',
    position: 'absolute',
    elevation: 1,
    bottom: '5%',
    right: '5%',
    borderRadius: 100,
    padding: "2.5%",
  },
  foodNameCard: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    elevation: 0,
    top: `${imageTopElementsPosition + 2}%`,
    right: '5%',
    padding: 0,
  },
  foodHealthyStatusCard: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    elevation: 0,
    bottom: '5%',
    left: '5%',
    padding: 0,
  },
};

export const styles = StyleSheet.create(styleObject);
