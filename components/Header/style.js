import {StyleSheet} from 'react-native';
import {scaleFontSize} from '../../assets/styles/scaling';
import { getFontFamily } from '../../assets/fonts/helper';

const style = StyleSheet.create({
  title1: {
    fontFamily: getFontFamily('Inter_18pt', '600'),
    fontSize: scaleFontSize(24),
    lineHeight: scaleFontSize(29),
    //fontWeight: '600',
  },
  title2: {
    fontFamily: getFontFamily('Inter_18pt', '600'),
    fontSize: scaleFontSize(18),
    lineHeight: scaleFontSize(22),
    //fontWeight: '600',
  },
  title3: {
    fontFamily: getFontFamily('Inter_18pt', '600'),
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(19),
    //fontWeight: '600',
  },
});

export default style;