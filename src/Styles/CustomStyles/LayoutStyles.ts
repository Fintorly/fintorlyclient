import {StyleSheet} from 'react-native';
import {ThemeType, ThemeKeys} from '~/Theme/ThemeTypes';
export const layoutStyles = (theme: ThemeType, eva: Record<string, any>) => {
  return StyleSheet.create({
    displayFlex: {
      display: 'flex',
    },
    displayNone: {
      display: 'none',
    },
    fullscreenContainer: {
      flex: 1,
      position: 'relative',
    },
    flexGrow: {
      flexGrow: 1,
    },
    autoWidth: {
      width: 'auto',
    },
    absoluteBottom: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    bgWhite: {
      backgroundColor: eva[ThemeKeys.colorWhite],
    },
    bgGrey: {
      backgroundColor: eva[ThemeKeys.colorInkSmoke],
    },
    bgPrimary: {
      backgroundColor: eva[ThemeKeys.colorPrimary],
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    rowContainer: {
      flexDirection: 'row',
    },
    alignCenter: {
      alignItems: 'center',
    },
    justifyCenter: {
      justifyContent: 'center',
    },
    justifySpaceAround: {
      justifyContent: 'space-around',
    },
    horizontalPadding: {
      paddingHorizontal: theme.spacing.horizontal,
    },
    horizontalMargin: {
      marginHorizontal: theme.spacing.horizontal,
    },
    paddingMedium: {
      padding: (theme.spacing.horizontal / 2) * 3,
    },
    bottomPadding: {
      paddingBottom: (theme.spacing.horizontal / 2) * 5,
    },
    bottomPaddingSmall: {
      paddingBottom: theme.spacing.horizontal / 2,
    },
    bottomPaddingMedium: {
      paddingBottom: (theme.spacing.horizontal / 2) * 3,
    },
    paddingVerticalSmall: {
      paddingVertical: theme.spacing.horizontal / 2,
    },
    paddingVerticalBase: {
      paddingVertical: theme.spacing.horizontal,
    },
    paddingVerticalMedium: {
      paddingVertical: (theme.spacing.horizontal / 2) * 3,
    },
    paddingRightMedium: {
      paddingRight: (theme.spacing.horizontal / 2) * 3,
    },
    marginTopExtraSmall: {
      marginTop: theme.spacing.horizontal / 4,
    },
    marginTopSmall: {
      marginTop: theme.spacing.horizontal / 2,
    },
    marginTopBase: {
      marginTop: theme.spacing.horizontal,
    },
    marginTopMedium: {
      marginTop: (theme.spacing.horizontal / 2) * 3,
    },
    marginTopLarge: {
      marginTop: theme.spacing.horizontal * 2,
    },
    marginTopExtraLarge: {
      marginTop: (theme.spacing.horizontal / 2) * 5,
    },
    marginTopHuge: {
      marginTop: (theme.spacing.horizontal / 2) * 7,
    },
    marginBottomHuge: {
      marginBottom: (theme.spacing.horizontal / 2) * 10,
    },
    marginLeftSmall: {
      marginLeft: theme.spacing.horizontal / 2,
    },
    marginLeftBase: {
      marginLeft: theme.spacing.horizontal,
    },
    marginRightBase: {
      marginRight: theme.spacing.horizontal,
    },
    marginBottomLarge: {
      marginBottom: (theme.spacing.horizontal / 2) * 3,
    },
    marginBottomMedium: {
      marginBottom: theme.spacing.horizontal,
    },
    marginBottomSmall: {
      marginBottom: theme.spacing.horizontal / 2,
    },
    right: {
      right: theme.spacing.horizontal,
    },
    rightLarge: {
      right: (theme.spacing.horizontal / 2) * 3,
    },
    topLarge: {
      top: (theme.spacing.horizontal / 2) * 3,
    },
    paddingTopSmall: {
      paddingTop: theme.spacing.horizontal / 2,
    },
    paddingTopMedium: {
      paddingTop: (theme.spacing.horizontal / 2) * 3,
    },
    paddingTopBase: {
      paddingTop: theme.spacing.horizontal,
    },
  });
};
