import React, {useEffect, useState} from 'react';
import RememberToggle from '~/Components/RememberToggle';
import {LangKeys} from '~/Locale/LangKeys';
import {useStyle} from '~/Theme/ThemeHelper';
import Button from '~/Components/Button';
import LinkButton from '~/Components/LinkButton';
import {schemaLoginWithPassword} from '~/Common/validations/auth/login';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '~/Common/yup';
import {useTranslation} from 'react-i18next';
import {hideHud, showHud} from '~/Hud/HudHelper';
import {GoToOtp, GoToPushLogin} from '~/Navigator/Router';
import Form from '~/Components/Form';
import {handleError} from '~/Helpers/ErrorHandler';
import AuthActions from '~/Api/AuthActions';
import {LoginUserType} from '~/Common/enums/user';
import {Keyboard} from 'react-native';
import {MAX_LENGTH} from '~/Common/constants/validations';
import {handleLinking} from '~/Helpers/LinkingHelper';
import {CommonUrl, CommonUrlschema} from '~/Common/constants/url';
import {globalConfirmModalRef} from '~/Components/GlobalConfirmModal';
import IconType from '~/Styles/IconType';
import {ThemeKeys} from '~/Theme/ThemeKeys';

export const LoginIndividual = (isTabChange: boolean) => {
  const {layoutStyles, themeVariables} = useStyle();
  const {t} = useTranslation();
  const [rememberChecked, setRememberChecked] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState<string>();
  const confirmModal = globalConfirmModalRef.current!;

  type FormType = yup.InferType<typeof schemaLoginWithPassword>;
  const {control, handleSubmit, formState, reset, getValues, setValue} =
    useForm<FormType>({
      mode: 'onChange',
      resolver: yupResolver(schemaLoginWithPassword),
      defaultValues: {
        customerIdentifier: __DEV__ ? '100341198' : '',
        password: __DEV__ ? '13579' : '',
      },
    });

  const showModal = (message: string) =>
    confirmModal.show({
      title: t(LangKeys.warning),
      message: message,
      approveText: t(LangKeys.ok),
      approveButtonStatus: 'primary',
      iconSize: 36,
      icon: IconType.ExclamationBold,
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
      customerIdentifier: getValues('customerIdentifier'),
      customerType: LoginUserType.Individual,
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
      customerIdentifier: values.customerIdentifier,
      password: values.password,
    };
    if (values.captcha) {
      loginRequest = {...loginRequest, ...{captcha: values.captcha}};
    }
    AuthActions.login(loginRequest)
      .then(response => {
        if (response.data.continueSms) {
          AuthActions.createOtp()
            .then(otpResponse => {
              hideHud();
              GoToOtp({
                loginUserType: LoginUserType.Individual,
                isSubCustomer: false,
                customerIdentifier: values.customerIdentifier,
                password: values.password,
                shouldSaveUser: rememberChecked,
                isMainCustomerDocumentConfirmed:
                  response.data.isDocumentConfirmed,
                isMainCustomerShowedApprovementScreen:
                  response.data.isShowedApprovementScreen,
                ...otpResponse.data,
                ...response.data,
              });
            })
            .catch(handleError);
          return;
        }
        hideHud();
        GoToPushLogin({
          isSubCustomer: false,
          customerIdentifier: values.customerIdentifier,
          password: values.password,
          loginUserType: LoginUserType.Individual,
          shouldSaveUser: rememberChecked,
          isMainCustomerDocumentConfirmed: response.data.isDocumentConfirmed,
          isMainCustomerShowedApprovementScreen:
            response.data.isShowedApprovementScreen,
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
    handleLinking(CommonUrlschema.IndividualForgetPassword).catch(() =>
      handleLinking(CommonUrl.ZiraatApp),
    );
  };

  return (
    <Form.Context key={'login-Indivial'} value={{control}}>
      <Form.InputNumber
        name="customerIdentifier"
        placeholder={t(LangKeys.input_identity_no)}
        maxLength={MAX_LENGTH.TCKN}
      />
      <RememberToggle
        text={t(LangKeys.remember_me)}
        checked={rememberChecked}
        onCheckChanged={onRememberCheckChanged}
        style={layoutStyles.marginTopSmall}
      />
      <Form.InputPassword
        name="password"
        placeholder={t(LangKeys.input_password)}
        style={layoutStyles.marginTopSmall}
        maxLength={MAX_LENGTH.PASSWORD}
        inputMode="numeric"
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
        status="primary"
        disabled={!formState.isValid}
        style={layoutStyles.marginTopBase}
        onPress={handleSubmit(_handleSubmit)}
      />
      {/* CommonUrlschema.IndividualForgetPassword */}
      <LinkButton
        text={t(LangKeys.label_forget_password)}
        onPress={handleForgetPassword}
        containerStyle={[
          layoutStyles.alignCenter,
          layoutStyles.marginTopMedium,
        ]}
        tagStyle={{
          a: {
            color: themeVariables.eva[ThemeKeys.colorInkMid],
          },
        }}
      />
    </Form.Context>
  );
};
