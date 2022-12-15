import React, {createContext, ReactElement} from 'react';
import {AddressType, LoginResponseType} from '~/Common/types/login';
import {CartInfoResponse} from '~/Mobile-Api';

export type UserInfoType = {
  userAccessType: number;
  address?: AddressType;
} & LoginResponseType;
type UserValues = {
  userInfo: UserInfoType;
  cartInfo?: CartInfoResponse;
  setUserInfo: (_userInfo: UserInfoType) => void;
  clearUserInfo: () => void;
  setCartInfo: (_carInfo?: CartInfoResponse) => void;
};

const defaultValue: UserValues = {
  userInfo: {} as UserInfoType,
  cartInfo: {} as CartInfoResponse,
  setUserInfo: (_userInfo: UserInfoType) => {},
  clearUserInfo: () => {},
  setCartInfo: (_cartInfo?: CartInfoResponse) => {},
};

const UserContext = createContext<UserValues>({
  ...defaultValue,
});

export const UserProvider = ({children}: {children: ReactElement}) => {
  const [userInfo, setUserInfo] = React.useState<UserInfoType>(
    defaultValue.userInfo,
  );
  const [cartInfo, setCartInfo] = React.useState<CartInfoResponse>();

  const _setUserInfo = (_userInfo: UserInfoType) => {
    setUserInfo({..._userInfo});
  };
  const _setCartInfo = (_cartInfo?: CartInfoResponse) => {
    _cartInfo ? setCartInfo({..._cartInfo}) : setCartInfo(undefined);
  };

  const clearUserInfo = () => {
    setUserInfo({} as UserInfoType);
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo: (_userInfo: UserInfoType) => {
          _setUserInfo(_userInfo);
        },
        clearUserInfo,
        cartInfo,
        setCartInfo: (_cartInfo?: CartInfoResponse) => {
          _setCartInfo(_cartInfo);
        },
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
