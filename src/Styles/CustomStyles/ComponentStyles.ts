import {StyleSheet} from 'react-native';
import {ThemeType, ThemeKeys} from '../../Theme/ThemeTypes';
export const componentStyles = (theme: ThemeType, eva: Record<string, any>) => {
  return StyleSheet.create({
    lineHeightBase: {
      lineHeight: 21,
    },
    boldFontWeight: {
      fontWeight: '500',
    },
    normalFontWeight: {
      fontWeight: 'normal',
    },
    defaultLabelStyle: {
      fontSize: 15,
      fontFamily: theme.fonts.book,
      lineHeight: 20,
      color: eva[ThemeKeys.colorInk],
    },
    centerText: {
      textAlign: 'center',
    },
    loginErrorCircle: {
      width: 92,
      height: 92,
      backgroundColor: eva[ThemeKeys.colorInkSmoke],
      borderRadius: 184,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ibanAccessoryLeft: {
      marginLeft: 10,
      marginRight: -10,
    },
    errorBorder: {
      borderColor: eva[ThemeKeys.colorPrimary],
    },
    accountNumberContainerSmall: {
      flex: 0.29,
    },
    accountNumberContainerMedium: {
      flex: 0.4,
    },
    leftText: {
      textAlign: 'left',
    },
    rightText: {
      textAlign: 'right',
    },
  });
};
