import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  LoginRequirements: undefined;
  Auth: undefined;
  About: undefined;
  Information: undefined;
  TabStack: TabStackProps;
  RegisterOtp: RegisterOtpProps;
  CreateProfilePersonelInfo: CreateProfilePersonelInfoProps
  CreateProfileCryptoInformation: CreateProfileCryptoInformationProps
  CreateProfileFinish: CreateProfileFinishProps
};


export type TabStackProps = {
  Home: undefined;
};

export type RegisterOtpProps = {
  userName: string;
  email: string;
  password: string;
};

//Profile
export type CreateProfilePersonelInfoProps = {
  userType: number;
};
export type CreateProfileCryptoInformationProps = {
  userType: number;
};

export type CreateProfileFinishProps = {
  userType: number;
};

export type DefaultNavigationProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
