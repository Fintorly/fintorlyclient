import {CommonActions, StackActions} from '@react-navigation/native';
import {Linking} from 'react-native';
import Config from 'react-native-config';
import {navigationRef, navigatorRef} from './NavigatorRefs';
import {
  HomeProps,
} from './NavigatorTypes';

export const Navigate = async (name: string, params?: any) => {
  if (await navigatorRef.current?.shouldBlockNavigation(name, params)) {
    return;
  }
  navigationRef.current?.navigate(name, params);
};
export const Push = (name: string, params?: any) => {
  navigationRef.current?.dispatch(StackActions.push(name, params));
};

export const GoBack = () => {
  navigationRef.current?.goBack();
};
export const Pop = (popCount: number) => {
  navigationRef.current?.dispatch(StackActions.pop(popCount));
};

export const navigateUrl = (url: string) => {
  Linking.openURL(`${Config.PREFIX_URL}${url}`);
};

export const Root = () => {
  Reset('Root');
};

export const GoToLogin = () => {
  Reset('Login');
};

export const GoToAuth = () => {
  Reset('Auth');
};
export const Reset = (name: string, params?: any, index?: number) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: index ?? 0,
      routes: [
        {
          name,
          params,
        },
      ],
    }),
  );
};

export const GoToInformation = () => {
  Navigate('Information');
};

export const GoToAbout = () => {
  Navigate('About');
};

export const GoToHome = (passProps: HomeProps) => {
  Navigate('Home', passProps);
};

export const GoToMyOffer = () => {
  Navigate('MyAccountStack', {
    screen: 'MyOffer',
    initial: false,
  });
};

export const PopToTop = () => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};
