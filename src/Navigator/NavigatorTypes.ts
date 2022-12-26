import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  LoginRequirements: undefined;
  Auth: undefined;
  About: undefined;
  Information: undefined;
  TabStack: TabStackProps;
  RegisterOtp: RegisterOtpProps;
};


export type TabStackProps = {
  Home: undefined;
};

export type RegisterOtpProps = {
  userName : string;
  email : string;
  password : string;
};


export type DefaultNavigationProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
