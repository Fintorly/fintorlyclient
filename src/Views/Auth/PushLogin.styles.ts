import {StyleSheet} from 'react-native';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';

export function MessageStyle() {
  const {themeVariables} = useStyle();
  const styles = StyleSheet.create({
    div: {
      textAlign: 'center',
    },
    h3: {
      fontSize: 16,
      fontWeight: '500',
      fontFamily: themeVariables.fonts.book,
      lineHeight: 20,
      color: themeVariables.eva[ThemeKeys.colorInk],
    },
    p: {
      fontSize: 13,
      fontFamily: themeVariables.fonts.book,
      lineHeight: 20,
      color: themeVariables.eva[ThemeKeys.colorInk],
    },
  });
  return styles;
}

export default function () {
  const styles = StyleSheet.create({
    content: {
      width: '80%',
      lineHeight: 22,
    },
    button: {
      width: '100%',
    },
    gif: {
      width: 80,
      height: 80,
    },
  });

  return styles;
}
