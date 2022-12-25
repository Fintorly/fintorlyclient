import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  LoginRequirements: undefined;
  Auth: undefined;
  About: undefined;
  Information: undefined;
  TabStack: TabStackProps;
};


export type TabStackProps = {
  Home: undefined;
};


export type DefaultNavigationProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
