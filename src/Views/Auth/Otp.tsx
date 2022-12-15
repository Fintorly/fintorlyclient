import {yupResolver} from '@hookform/resolvers/yup';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Button from '~/Components/Button';
import {Card} from '~/Components/Card';
import Countdown from '~/Components/Countdown';
import {LangKeys} from '~/Locale/LangKeys';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import {GoToLoginRequirements} from '~/Navigator/Router';
import {useStyle} from '~/Theme/ThemeHelper';
import * as yup from 'yup';
import AuthActions from '~/Api/AuthActions';
import {hideHud, showHud} from '~/Hud/HudHelper';
import {getErrorMessage, handleError} from '~/Helpers/ErrorHandler';
import UserContext from '~/Context/UserContext';
import Form from '~/Components/Form';
import {schemaOtp} from '~/Common/validations/auth/login';
import Avatar from '~/Components/Image/Avatar';
import Text from '~/Components/Text';
import KeyboardAwareScrollView from '~/Components/KeyboardAwareScrollView';
import CustomerDataProvider from '~/Providers/CustomerDataProvider';
import {LoginUserType} from '~/Common/enums/user';
import {LoginResponseType} from '~/Common/types/login';
import IconType from '~/Styles/IconType';
import MobileApi from '~/Api/MobileApi';
import {getUserAccessType} from '~/Helpers/User';
import {MAX_LENGTH} from '~/Common/constants/validations';
import {globalConfirmModalRef} from '~/Components/GlobalConfirmModal';

type OtpFormType = yup.InferType<typeof schemaOtp>;

export function Otp(props: DefaultNavigationProps<'Otp'>) {
  const {
    route: {
      params: {
        telphoneNumber,
        password,
        shouldSaveUser,
        customerIdentifier,
        name,
        companyName,
        loginUserType,
        surname,
        userCustomerNumber,
        isDocumentConfirmed,
        isShowedApprovementScreen,
        isSubCustomer,
        isMainCustomerDocumentConfirmed,
        isMainCustomerShowedApprovementScreen,
        otpDuration,
      },
    },
  } = props;

  const {layoutStyles, themeVariables, componentStyles} = useStyle();
  const [isOtpExpired, setOtpExpired] = useState(false);
  const [otpTryCount, setOtpTryCount] = useState(0);
  const [resendCount, setResendCount] = useState(otpDuration);
  const [otpExpireDuration, setOtpExpireDuration] = useState(otpDuration);
  const {t} = useTranslation();
  const {setUserInfo} = useContext(UserContext);

  const {handleSubmit, control, formState, reset} = useForm<OtpFormType>({
    mode: 'onChange',
    resolver: yupResolver(schemaOtp),
    defaultValues: {
      otp: __DEV__ ? '123456' : '',
    },
  });

  const intervalRef = useRef<NodeJS.Timeout>();
  const confirmModal = globalConfirmModalRef.current!;
  const verifyLogin = (values: OtpFormType) => {
    showHud();
    AuthActions.loginVerifyOtp({
      password: password,
      securityCode: values.otp,
    })
      .then(() => {
        MobileApi.me
          .getApprovment()
          .then(response => {
            const accessType = getUserAccessType(response.data);
            const userInfo: LoginResponseType = {
              name: response.data.name,
              surname: response.data.surname,
              companyName: companyName,
              userLoginType: loginUserType,
              isDocumentConfirmed: isDocumentConfirmed,
              isShowedApprovementScreen: isShowedApprovementScreen,
              isSubCustomer: isSubCustomer,
              isMainCustomerDocumentConfirmed: isMainCustomerDocumentConfirmed,
              isMainCustomerShowedApprovementScreen:
                isMainCustomerShowedApprovementScreen,
              id: response.data.id,
              customerStatus: response.data.customerStatus,
            };
            setUserInfo({
              ...userInfo,
              userAccessType: accessType,
            });
            if (shouldSaveUser) {
              CustomerDataProvider.Data.customerIdentifier = customerIdentifier;
              CustomerDataProvider.Data.name = response.data.name;
              CustomerDataProvider.Data.companyName = companyName ?? '';
              CustomerDataProvider.Data.surname = response.data.surname;
              CustomerDataProvider.Data.customertype = loginUserType;
              CustomerDataProvider.Data.memberCustomerNumber =
                userCustomerNumber;
            }
            hideHud();
            setOtpExpired(true);
            GoToLoginRequirements();
          })
          .catch(error => {
            hideHud();
            confirmModal.show({
              title: t(LangKeys.no_confirmation),
              message: getErrorMessage(error) ? getErrorMessage(error) : '',
              approveText: t(LangKeys.ok),
              approveButtonStatus: 'secondary',
              iconSize: 36,
              icon: IconType.ExclamationBold,
            });
          })
          .finally(hideHud);
      })
      .catch(() => {
        hideHud();
        confirmModal.show({
          title: t(LangKeys.otp_failed),
          message: t(LangKeys.otp_failed_message),
          approveText: t(LangKeys.ok),
          approveButtonStatus: 'secondary',
          iconSize: 36,
          icon: IconType.ExclamationBold,
        });
      });
  };

  const _handleSubmit = (values: OtpFormType) => {
    verifyLogin(values);
  };

  const handleResendOtp = () => {
    showHud();
    AuthActions.createOtp()
      .then(({data}) => {
        resetTimer(data.otpDuration);
      })
      .catch(handleError)
      .finally(hideHud);
  };

  const resetTimer = (count: number) => {
    setResendCount(count);
    setOtpExpireDuration(count);
    reset();
    startInterval();
    setOtpExpired(false);
    setOtpTryCount(otpTryCount + 1);
  };

  const showShowResendButton = () => {
    return isOtpExpired || resendCount === 0;
  };

  const startInterval = () => {
    intervalRef.current = setInterval(() => handleInterval(), 1000);
  };

  const intervalClear = () => {
    clearInterval(intervalRef.current!);
  };

  const handleInterval = () => {
    setResendCount(count => count - 1);
  };

  useEffect(() => {
    startInterval();
    return () => {
      intervalClear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showShowResendButton()) {
      intervalClear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resendCount, isOtpExpired]);

  const getFullName = () => {
    switch (loginUserType) {
      case LoginUserType.Corparate:
        return companyName;
      case LoginUserType.Individual:
        return [name, surname].join(' ');
      default:
        return;
    }
  };

  return (
    <View
      style={[
        layoutStyles.fullscreenContainer,
        layoutStyles.horizontalPadding,
        layoutStyles.marginTopLarge,
      ]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={[
          layoutStyles.flexGrow,
          layoutStyles.bottomPadding,
        ]}>
        <View style={[layoutStyles.alignCenter, layoutStyles.justifyCenter]}>
          <Avatar
            hideAddIcon
            disabled
            containerStyle={layoutStyles.marginTopExtraLarge}
          />
          <Text
            appearance="light"
            category="hero2"
            style={[componentStyles.centerText, layoutStyles.marginTopBase]}>
            {t(LangKeys.label_greeting_text)}
          </Text>
          <Text
            appearance="light"
            category="hero1"
            style={[componentStyles.centerText, layoutStyles.marginTopSmall]}>
            {getFullName()}
          </Text>
          <Text
            appearance="light"
            category="label"
            style={[componentStyles.centerText, layoutStyles.marginTopSmall]}>
            {t(LangKeys.otp_info, {
              phoneNumber: telphoneNumber,
            })}
          </Text>
        </View>

        <Card style={layoutStyles.marginTopLarge}>
          <View style={[layoutStyles.rowContainer, layoutStyles.alignCenter]}>
            <Form.Context value={{control}}>
              <Form.InputNumber
                name={'otp'}
                maxLength={MAX_LENGTH.SMS_OTP}
                placeholder={t(LangKeys.sms_password)}
                containerStyle={[
                  layoutStyles.fullscreenContainer,
                  {marginRight: themeVariables.spacing.horizontal},
                ]}
              />
            </Form.Context>

            <Countdown
              key={otpTryCount}
              remainingTime={otpExpireDuration}
              onFinish={() => setOtpExpired(true)}
            />
          </View>

          {showShowResendButton() ? (
            <Button
              label={`${t(LangKeys.resend_otp)}`}
              style={layoutStyles.marginTopBase}
              onPress={handleResendOtp}
              status={'secondary'}
              buttonType={'rounded'}
            />
          ) : (
            <Button
              disabled={isOtpExpired || !formState.isValid}
              label={t(LangKeys.login)}
              style={layoutStyles.marginTopBase}
              onPress={handleSubmit(_handleSubmit)}
              status={'primary'}
              buttonType={'rounded'}
            />
          )}
        </Card>
      </KeyboardAwareScrollView>
    </View>
  );
}
