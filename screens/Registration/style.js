import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale, scaleFontSize} from '../../assets/styles/scaling';
import { getFontFamily } from '../../assets/fonts/helper';

const style = StyleSheet.create({
  container: {
    flex:1,
    marginHorizontal: horizontalScale(24),
    justifyContent:'center'
  },
  registrationButton: {
    alignItems: 'center',
  },
  error: {
    fontFamily: getFontFamily('Inter_18pt', '600'),
    fontSize: scaleFontSize(16),
    color: '#FF0000',
    marginBottom: verticalScale(24),
  },
  success: {
    fontFamily: getFontFamily('Inter_18pt', '600'),
    fontSize: scaleFontSize(16),
    color: '#28a745',
    marginBottom: verticalScale(24),
  },
});

export default style;