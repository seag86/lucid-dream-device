import { Dimensions, Platform, StyleSheet } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window')
const ios = Platform.OS === 'ios'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  blockView: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  mh5: {
    marginHorizontal: 5,
  },
  mh10: {
    marginHorizontal: 10,
  },
  mh15: {
    marginHorizontal: 15,
  },
  mh20: {
    marginHorizontal: 20,
  },
  mh48: {
    marginHorizontal: 48,
  },
  mt3: {
    marginTop: 3,
  },
  mt5: {
    marginTop: 5,
  },
  mt8: {
    marginTop: 8,
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  mt20: {
    marginTop: 20,
  },
  mt25: {
    marginTop: 25,
  },
  mt30: {
    marginTop: 30,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mb20: {
    marginBottom: 20,
  },
  mb25: {
    marginBottom: 25,
  },
  mb30: {
    marginBottom: 30,
  },
  mr5: {
    marginRight: 5,
  },
  mr8: {
    marginRight: 8,
  },
  mr10: {
    marginRight: 10,
  },
  mr15: {
    marginRight: 15,
  },
  mr18: {
    marginRight: 18,
  },
  mr20: {
    marginRight: 20,
  },
  ml10: {
    marginLeft: 10,
  },
  ml20: {
    marginLeft: 20,
  },
  ml25: {
    marginLeft: 25,
  },
  pv5: {
    paddingVertical: 5,
  },
  pv10: {
    paddingVertical: 10,
  },
  pb25: {
    paddingBottom: 25,
  },
  ph5: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  ph8: {
    paddingRight: 8,
    paddingLeft: 8,
  },
  ph10: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  ph15: {
    paddingRight: 15,
    paddingLeft: 15,
  },
  ph20: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  pr0: {
    paddingRight: 0,
  },
  pr10: {
    paddingRight: 10
  },
  pl8: {
    paddingLeft: 8
  },
  pl15: {
    paddingLeft: 15
  },
  pabsolute: {
    position: 'absolute',
  },
  flexRow: {
    flexDirection: 'row',
  },
  spaceBtw: {
    justifyContent: 'space-between',
  },
  spaceEvn: {
    justifyContent: 'space-evenly',
  },
  spaceCenter: {
    justifyContent: 'center',
  },
  spaceEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start'
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  flex1: {
    flex: 1,
  },
  overHidden:{
    overflow: 'hidden',
  },
  text7: {
    fontSize: 7,
    color: '#fff',
  },
  text8: {
    fontSize: 8,
    color: '#555',
    //fontFamily: 'helvetica',
  },
  text24: {
    fontSize: 24,
    color: '#fff',
  },
  text28: {
    fontSize: 28,
    color: '#fff',
  },
  text48: {
    fontSize: 48,
    color: '#fff',
  },
  text9: {
    fontSize: 14,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  text18: {
    fontSize: 18,
  },
  text19: {
    fontSize: 19,
    color: '#fff',
  },
  text20: {
    fontSize: 20,
    color: '#fff',
  },
  text14: {
    fontSize: 14,
  },
  text13: {
    fontSize: 13,
    color: '#fff',
  },
  text12: {
    fontSize: 12,
    color: '#fff',
  },
  text11: {
    fontSize: 11,
    color: '#fff',
  },
  text21: {
    fontSize: 21,
    color: '#fff',
  },
  count2Text: {
    fontSize: 16,
    color: '#aaa',
  },
  textWhite: {
    color: '#fff',
  },
  textBlack: {
    color: '#000',
  },
  textGray: {
    color: 'rgba(255, 255, 255, 0.2)',
  },
  textDark: {
    color: '#242924',
  },
  textRed: {
    color: '#F53939',
  },
  textBlue: {
    color: '#0A84FF',
  },
  textGreen: {
    color: '#1BCB21',
  },
  textGreen2: {
    color: '#1BCB21',
  },
  textOrange: {
    color: '#F59439',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textUnderline: {
    textDecorationLine: 'underline'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  aCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  jCenter: {
    justifyContent: 'center',
  },
  image9: {
    height: 9,
    width: 9,
    resizeMode: 'contain',
  },
  image24: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  image27: {
    height: 27,
    width: 27,
    resizeMode: 'contain',
  },
  image32: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  image44: {
    height: 44,
    width: 44,
    resizeMode: 'contain',
  },
  image49: {
    height: 49,
    width: 49,
    resizeMode: 'contain',
  },
  avatarImage: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
  image72: {
    height: 72,
    width: 72,
    resizeMode: 'contain',
  },
  image84: {
    height: 84,
    width: 84,
    resizeMode: 'contain',
  },
  avatar41: {
    height: 41,
    width: 41,
    resizeMode: 'contain',
  },
  image60: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  image20: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  image26: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },
  image14: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
  },
  image15: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  image36: {
    height: 36,
    width: 36,
    resizeMode: 'contain',
  },
  image40: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  image68: {
    height: 68,
    width: 68,
    resizeMode: 'contain',
  },
  btn40: {
    height: 40,
    width: 40,
  },
  btn60: {
    height: 60,
    width: 60,
  },
  tInput: {
  },
  checkboxContainer: {
  },
  checkbox: {
    alignSelf: "center",
    height: 50,
  },
  body: {
    backgroundColor: Colors.red,
  },
  sectionContainer: {
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  content: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing * 2,
  },
  activityIndicatorContainer: { marginVertical: 6 },
  settingsBtn: {
    left: theme.spacing * 2,
  },
  hLine: {
    height: 1,
    backgroundColor: '#aaa',
  },
  measure: { color: 'red', fontSize: 24 },
  descriptor: { color: 'blue', fontSize: 24 },
  deviceCard: {
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: 'rgba(60,64,67,0.3)',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
  },
  serviceCard: {
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: 'rgba(60,64,67,0.3)',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
  },
  deviceContainer: {
    padding: 10,
    flex: 1,
  },
  deviceHeader: {
    backgroundColor: 'teal',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: 'rgba(60,64,67,0.3)',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
    marginTop: 10,
  },

});