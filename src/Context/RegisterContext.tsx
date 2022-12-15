import React, {createContext, ReactElement} from 'react';
import {Item} from 'react-native-picker-select';
import {CksUyeSorgulamaIslemleriResponse} from '~/Mobile-Api';
import {NewAccountStepOneInputTypes} from '~/Screens/NewAccount/NewAccountStepOne';
import {NewAccountStepThreeInputTypes} from '~/Screens/NewAccount/NewAccountStepThree';
import {NewAccountStepTwoInputTypes} from '~/Screens/NewAccount/NewAccountStepTwo';

type RegisterModel = {
  stepOne: NewAccountStepOneInputTypes;
  stepTwo: NewAccountStepTwoInputTypes;
  stepThree: NewAccountStepThreeInputTypes;
  cksCategoryList: Item[];
  cksProductList: CksUyeSorgulamaIslemleriResponse[];
};

type RegisterValues = {
  registerSteps: RegisterModel;
  setRegisterStep: (registerSteps: RegisterModel) => void;
  clearRegisterContext: () => void;
};

const defaultValue: RegisterModel = {
  stepOne: {} as NewAccountStepOneInputTypes,
  stepTwo: {} as NewAccountStepTwoInputTypes,
  stepThree: {} as NewAccountStepThreeInputTypes,
  cksCategoryList: {} as Item[],
  cksProductList: {} as CksUyeSorgulamaIslemleriResponse[],
};

const RegisterContext = createContext<RegisterValues>({
  registerSteps: defaultValue,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setRegisterStep: (registerStep: RegisterModel) => {},
  clearRegisterContext: () => {},
});

export const RegisterProvider = ({children}: {children: ReactElement}) => {
  const [registerSteps, setRegisterStep] = React.useState<RegisterModel>(
    defaultValue,
  );

  const clearRegisterContext = () => {
    setRegisterStep({...defaultValue});
  };

  return (
    <RegisterContext.Provider
      value={{
        registerSteps,
        setRegisterStep: (_registerSteps: RegisterModel) => {
          setRegisterStep({..._registerSteps});
        },
        clearRegisterContext: () => {
          clearRegisterContext();
        },
      }}>
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterContext;
