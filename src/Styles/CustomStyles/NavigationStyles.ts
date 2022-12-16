import {StyleSheet} from 'react-native';
import {ThemeType} from '../../Theme/ThemeTypes';
export const navigationStyles = (
  theme: ThemeType,
  _eva: Record<string, any>,
) => {
  return StyleSheet.create({
    tabBarLabel: {
      fontSize: 11,
      lineHeight: 12,
      fontFamily: theme.fonts.medium,
      fontWeight: '500',
    },
    navBarIcon: {
      fontSize: 16,
    },
  });
};
