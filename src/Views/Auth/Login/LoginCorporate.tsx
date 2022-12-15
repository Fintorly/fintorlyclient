import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import RememberToggle from '~/Components/RememberToggle';
import {LangKeys} from '~/Locale/LangKeys';
import {useStyle} from '~/Theme/ThemeHelper';
import Button from '~/Components/Button';
import LinkButton from '~/Components/LinkButton';
import {schemaLoginWithPasswordCorporate} from '~/Common/validations/auth/login';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '~/Common/yup';
import {useTranslation} from 'react-i18next';
import Form from '~/Components/Form';
import {DefaultStyles} from './Login.styles';
import {hideHud, showHud} from '~/Hud/HudHelper';
import {GoToOtp, GoToPushLogin} from '~/Navigator/Router';
import AuthActions from '~/Api/AuthActions';
import {LoginUserType} from '~/Common/enums/user';
import {handleError} from '~/Helpers/ErrorHandler';
import {MAX_LENGTH} from '~/Common/constants/validations';
import {CommonUrl, CommonUrlschema} from '~/Common/constants/url';
import {handleLinking} from '~/Helpers/LinkingHelper';
import {globalConfirmModalRef} from '~/Components/GlobalConfirmModal';
import IconType from '~/Styles/IconType';
import {ThemeKeys} from '~/Theme/ThemeKeys';

export const LoginCorporate = (isTabChange: boolean) => {
  const {t} = useTranslation();
  const {layoutStyles, componentStyles, themeVariables} = useStyle();
  const defaultStyle = DefaultStyles();
  const [rememberChecked, setRememberChecked] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState<string>();
  const confirmModal = globalConfirmModalRef.current!;

  type FormType = yup.InferType<typeof schemaLoginWithPasswordCorporate>;
  const {control, handleSubmit, formState, reset, getValues, setValue} =
    useForm<FormType>({
      mode: 'onChange',
      resolver: yupResolver(schemaLoginWithPasswordCorporate),
      defaultValues: {
        customerNumber: __DEV__ ? '95567626' : '',
        userCustomerNumber: __DEV__ ? '95567626' : '',
        passwordCoparate: __DEV__ ? '13579' : '',
      },
    });

  const showModal = (message: string) =>
    confirmModal.show({
      title: t(LangKeys.warning),
      message: message,
      approveText: t(LangKeys.ok),
      approveButtonStatus: 'primary',
      iconSize: 36,
      icon: IconType.Information,
      hideCloseIcon: true,
    });

  useEffect(() => {
    reset();
  }, [isTabChange, reset]);

  const onRememberCheckChanged = (isChecked: boolean) => {
    setRememberChecked(isChecked);
  };

  const handleRefresh = () => {
    showHud();
    AuthActions.refreshCaptcha({
      customerIdentifier: getValues('customerNumber'),
      customerType: LoginUserType.Corparate,
    })
      .then(response => {
        setCaptcha(response.data.captcha!);
      })
      .catch(handleError)
      .finally(hideHud);
  };

  const _handleSubmit = (values: FormType) => {
    Keyboard.dismiss();
    showHud();
    let loginRequest = {
      customerNumber: values.customerNumber,
      memberCustomerNumber: values.userCustomerNumber,
      password: values.passwordCoparate,
    };
    if (values.captcha) {
      loginRequest = {...loginRequest, ...{captcha: values.captcha}};
    }
    AuthActions.corporateLogin(loginRequest)
      .then(response => {
        if (response.data.continueSms) {
          AuthActions.createOtp()
            .then(otpResponse => {
              GoToOtp({
                customerIdentifier: values.customerNumber,
                customerNumber: values.customerNumber,
                userCustomerNumber: values.userCustomerNumber,
                password: values.passwordCoparate,
                loginUserType: LoginUserType.Corparate,
                shouldSaveUser: rememberChecked,
                ...otpResponse.data,
                ...response.data,
              });
            })
            .catch(handleError)
            .finally(hideHud);
          return;
        }
        hideHud();
        GoToPushLogin({
          customerIdentifier: values.customerNumber,
          userCustomerNumber: values.userCustomerNumber,
          password: values.passwordCoparate,
          loginUserType: LoginUserType.Corparate,
          shouldSaveUser: rememberChecked,
          ...response.data,
        });
      })
      .catch(error => {
        hideHud();
        if (error.response.data.showCaptcha) {
          setCaptcha(error.response.data.captcha!);
          setValue('captchaShown', true);
          return;
        }
        showModal(error.response.data.errorMessage);
        return;
      });
  };
  const handleForgetPassword = () => {
    handleLinking(CommonUrlschema.CorporateForgetPassword).catch(() =>
      handleLinking(CommonUrl.ZiraatApp),
    );
  };
  const handleForgetCustomerNumber = () => {
    handleLinking(CommonUrl.RemindCustomerNumber);
  };

  return (
    <Form.Context key={'login-corporate'} value={{control}}>
      <Form.InputNumber
        name="customerNumber"
        maxLength={MAX_LENGTH.CUSTOMER_NUMBER}
        placeholder={t(LangKeys.customer_number)}
      />
      <RememberToggle
        text={t(LangKeys.remember_me)}
        checked={rememberChecked}
        onCheckChanged={onRememberCheckChanged}
        style={layoutStyles.marginTopSmall}
      />
      <Form.InputPassword
        name="passwordCoparate"
        placeholder={t(LangKeys.input_password)}
        style={layoutStyles.marginTopSmall}
        maxLength={MAX_LENGTH.PASSWORD}
        inputMode="numeric"
      />
      <Form.InputNumber
        name="userCustomerNumber"
        maxLength={MAX_LENGTH.CUSTOMER_NUMBER}
        style={layoutStyles.marginTopBase}
        placeholder={t(LangKeys.user_customer_number)}
      />
      {captcha && (
        <Form.Captcha
          name="captcha"
          containerStyle={layoutStyles.marginTopBase}
          base64String={captcha}
          refreshCaptcha={handleRefresh}
        />
      )}
      <Button
        label={t(LangKeys.button_continue).toLocaleUpperCase()}
        buttonType="rounded"
        status={'primary'}
        disabled={!formState.isValid}
        style={[layoutStyles.marginTopBase]}
        onPress={handleSubmit(_handleSubmit)}
      />
      <View style={defaultStyle.corporateBottomContainer}>
        <LinkButton
          text={t(LangKeys.label_forget_cutomer_number)}
          onPress={handleForgetCustomerNumber}
          textStyle={componentStyles.leftText}
          containerStyle={[
            layoutStyles.marginTopMedium,
            defaultStyle.linkButtonContainer,
          ]}
          tagStyle={{
            a: {
              color: themeVariables.eva[ThemeKeys.colorInkMid],
            },
          }}
        />
        <LinkButton
          text={t(LangKeys.label_forget_password)}
          onPress={handleForgetPassword}
          textStyle={componentStyles.rightText}
          containerStyle={[
            layoutStyles.marginTopMedium,
            defaultStyle.linkButtonContainer,
          ]}
          tagStyle={{
            a: {
              color: themeVariables.eva[ThemeKeys.colorInkMid],
            },
          }}
        />
      </View>
    </Form.Context>
  );
};
