import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  LoginRequirements: undefined;
  Auth: undefined;
  About: undefined;
  Information: undefined;
  Home: HomeProps;
};

export type HomeProps = {};


export type DefaultNavigationProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
