import { CommonActions, StackActions } from '@react-navigation/native';
import { Linking } from 'react-native';
import Config from 'react-native-config';
import { navigationRef, navigatorRef } from './NavigatorRefs';
import { CreateProfileCryptoInformationProps, CreateProfileFinishProps, CreateProfileInterestedProps, CreateProfilePersonelInfoProps, RegisterOtpProps } from './NavigatorTypes';
// import {
// } from './NavigatorTypes';

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

export const GoToHome = () => {
  Navigate('TabStack');
};

export const GoToRegisterOtp = (passProps: RegisterOtpProps) => {
  Navigate('RegisterOtp', passProps);
};

export const GoToOnBoardOne = () => {
  Navigate('OnBoardOne');
};
export const GoToOnBoardTwo = () => {
  Navigate('OnBoardTwo');
};
export const GoToOnBoardThree = () => {
  Navigate('OnBoardThree');
};
export const GoToOnBoardFour = () => {
  Navigate('OnBoardFour');
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


//profile

export const GoToCreateProfilePersonelInfo = (passProps: CreateProfilePersonelInfoProps) => {
  Navigate('CreateProfilePersonelInfo', passProps);
};

export const GoToCreateProfileCryptoInformation = (passProps: CreateProfileCryptoInformationProps) => {
  Navigate('CreateProfileCryptoInformation', passProps);
};

export const GoToCreateProfileInterested = (passProps: CreateProfileInterestedProps) => {
  Navigate('CreateProfileInterested', passProps);
};

export const GoToCreateProfileFinish = (passProps: CreateProfileFinishProps) => {
  Navigate('CreateProfileFinish', passProps);
};