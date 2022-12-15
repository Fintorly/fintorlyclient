import {StyleSheet} from 'react-native';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';

export default function () {
  const {themeVariables, componentStyles} = useStyle();
  const styles = StyleSheet.create({
    iconContainer: {
      backgroundColor: themeVariables.eva[ThemeKeys.colorInkSmoke],
      width: 80,
      height: 80,
      borderRadius: 40,
      alignSelf: 'center',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      width: '85%',
      textAlignVertical: 'center',
    },
    text: {
      ...componentStyles.centerText,
      textAlignVertical: 'center',
    },
    p: {
      color: themeVariables.eva[ThemeKeys.colorInk],
      fontFamily: themeVariables.fonts.book,
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 22,
      letterSpacing: 0.21,
      textAlignVertical: 'center',
    },
    a: {
      color: themeVariables.eva[ThemeKeys.colorInkDark],
    },
    versionContainer: {
      backgroundColor: themeVariables.eva[ThemeKeys.colorInkSmoke],
      flexDirection: 'row',
      width: '100%',
      borderRadius: 24,
      height: 48,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 40,
    },
  });

  return styles;
}
