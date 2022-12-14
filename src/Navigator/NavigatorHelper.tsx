import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
// import Logo from '~/Components/Logo';
// import {HeaderButton} from '~/Components/HeaderButton/HeaderButton';
// export const renderTabBarIcon = (
//   iconType: IconType,
//   color: string,
//   size: number = 16,
// ) => {
//   return <Icon name={iconType} color={color} size={size} />;
// };

// export const headerLogo = () => {
//   return {
//     headerTitle: () => <Logo />,
//   };
// };

// export const DefaultHeaderStyle = (): StackNavigationOptions => {
//   const {themeVariables} = useStyle();
//   return {
//     headerStyle: {
//       backgroundColor: themeVariables.eva[ThemeKeys.colorDarkPurple],
//       shadowOpacity: 0,
//       elevation: 0,
//     },
//     headerTitleStyle: {
//       color: themeVariables.eva[ThemeKeys.colorWhite],
//     },
//     headerBackTitleStyle: {
//       color: themeVariables.eva[ThemeKeys.colorWhite],
//     },
//     headerTintColor: themeVariables.eva[ThemeKeys.colorWhite],
//     headerBackTitle: ' ',
//     headerTitleAlign: 'center',
//   };
// };
// export const DefaultStackHeaderStyle = (): StackHeaderOptions => {
//   const {themeVariables} = useStyle();
//   return {
//     headerLeftContainerStyle: {
//       paddingLeft: themeVariables.spacing.horizontal,
//     },
//   };
// };

// export const HeaderBackIcon = (): StackHeaderOptions => {
//   const {themeVariables} = useStyle();
//   return {
//     headerBackImage: () => (
//       <Icon
//         name={IconType.ArrowBack}
//         color={themeVariables.eva[ThemeKeys.colorWhite]}
//         size={16}
//       />
//     ),
//   };
// };

export const NavButton = ({
  position,
  // iconType,
}: {
  position: 'left' | 'right';
  // iconType: IconType;
}) => {
  return position === 'left'
    ? {
        headerLeft: () => {
          <HeaderButton
            iconType={iconType}
            onPress={() => console.warn('left icon press')}
          />;
        },
      }
    : {
        headerRight: () => (
          <HeaderButton
            iconType={iconType}
            onPress={() => console.warn('right icon press')}
          />
        ),
      };
};
