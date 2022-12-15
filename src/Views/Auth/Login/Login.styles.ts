import {StyleSheet} from 'react-native';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeTypes';

export function DefaultStyles() {
  const {layoutStyles, themeVariables} = useStyle();

  const styles = StyleSheet.create({
    container: {
      marginTop: 50,
    },
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
    tabBar: {
      position: 'absolute',
      bottom: 0,
    },
    tabTitle: {
      ...layoutStyles.marginBottomSmall,
      alignSelf: 'center',
      fontSize: 20,
    },
    footerContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    footerCard: {
      flex: 1,
      height: '100%',
      backgroundColor: themeVariables.eva[ThemeKeys.colorPrimary],
      paddingHorizontal: 25,
      paddingVertical: 25,
    },
    firstFooterCard: {
      marginRight: 20,
    },
    cardText: {
      fontSize: 14,
      ...layoutStyles.marginTopSmall,
      lineHeight: 20,
    },
    logoContainer: {
      position: 'relative',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      position: 'absolute',
      ...layoutStyles.right,
    },
    corporateBottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    linkButtonContainer: {
      width: '40%',
    },
  });

  return styles;
}
