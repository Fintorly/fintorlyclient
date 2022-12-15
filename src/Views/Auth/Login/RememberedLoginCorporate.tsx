import React, {useEffect} from 'react';
import {View, Platform, Pressable, Keyboard} from 'react-native';
import {useStyle} from '~/Theme/ThemeHelper';
import {Card} from '~/Components/Card';
import {useState} from 'react';
import KeyboardAwareScrollView from '~/Components/KeyboardAwareScrollView';
import Logo from '~/Components/Logo';
import {Icon} from '@ui-kitten/components';
import IconType from '~/Styles/IconType';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import {DefaultStyles} from './Login.styles';
import {useTranslation} from 'react-i18next';
import {LangKeys} from '~/Locale/LangKeys';
import Form from '~/Components/Form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '~/Common/yup';
import {schemaRememberedCorporateLoginWithPassword} from '~/Common/validations/auth/login';
import {useForm} from 'react-hook-form';
import Button from '~/Components/Button';
import {
  GoToAuth,
  GoToInformation,
  GoToOtp,
  GoToPushLogin,
} from '~/Navigator/Router';
import LinkButton from '~/Components/LinkButton';
import BottomCard from '~/Components/BottomCard';
import {clearDataProvider} from '~/Helpers/User';
import CustomerDataProvider from '~/Providers/CustomerDataProvider';
import {hideHud, showHud} from '~/Hud/HudHelper';
import AuthActions from '~/Api/AuthActions';
import {LoginUserType} from '~/Common/enums/user';
import {handleError} from '~/Helpers/ErrorHandler';
import AvatarWithName from '~/Components/AvatarWithName';
import {MAX_LENGTH} from '~/Common/constants/validations';
import {globalConfirmModalRef} from '~/Components/GlobalConfirmModal';
import {CommonUrl, CommonUrlschema} from '~/Common/constants/url';
import {handleLinking} from '~/Helpers/LinkingHelper';

export function RememberedCorporate() {
  const {layoutStyles, themeVariables} = useStyle();
  const defaultStyle = DefaultStyles();
  const {t} = useTranslation();
  const [shownRegisterCard, setShownRegisterCard] = useState<boolean>(true);
  const [captcha, setCaptcha] = useState<string>();
  const confirmModal = globalConfirmModalRef.current!;

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
    if (!CustomerDataProvider.Data.customerIdentifier) {
      GoToAuth();
    }
  }, []);

  type FormType = yup.InferType<
    typeof schemaRememberedCorporateLoginWithPassword
  >;

  const {handleSubmit, control, formState, setValue} = useForm<FormType>({
    mode: 'onChange',
    resolver: yupResolver(schemaRememberedCorporateLoginWithPassword),
    defaultValues: {
      userCustomerNumber: __DEV__ ? '95567626' : '',
      password: __DEV__ ? '13579' : '',
    },
  });

  const toggleRegisterCard = (isVisible: boolean) => {
    Platform.OS === 'android' &&
      isVisible !== shownRegisterCard &&
      setShownRegisterCard(isVisible);
  };

  const handleRefresh = () => {
    showHud();
    AuthActions.refreshCaptcha({
      customerIdentifier: CustomerDataProvider.Data.customerIdentifier,
      customerType: CustomerDataProvider.Data.customertype!,
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
      customerNumber: CustomerDataProvider.Data.customerIdentifier,
      memberCustomerNumber: values.userCustomerNumber,
      password: values.password,
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
                customerIdentifier:
                  CustomerDataProvider.Data.customerIdentifier?.toString(),
                password: values.password,
                userCustomerNumber: values.userCustomerNumber,
                loginUserType: LoginUserType.Corparate,
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
          customerIdentifier:
            CustomerDataProvider.Data.customerIdentifier?.toString(),
          userCustomerNumber: values.userCustomerNumber,
          password: values.password,
          loginUserType: LoginUserType.Corparate,
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
  const handleRegister = () => {
    clearDataProvider();
    GoToAuth();
  };
  const handleMore = () => {
    GoToInformation();
  };
  return (
    <View style={[layoutStyles.fullscreenContainer, layoutStyles.spaceBetween]}>
      <KeyboardAwareScrollView
        onKeyboardDidShow={() => {
          toggleRegisterCard(false);
        }}
        onKeyboardDidHide={() => {
          toggleRegisterCard(true);
        }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={[
          layoutStyles.flexGrow,
          layoutStyles.bottomPadding,
        ]}>
        <View style={[layoutStyles.alignCenter, layoutStyles.justifyCenter]}>
          <View style={defaultStyle.logoContainer}>
            <Logo size={40} />
            <Pressable
              hitSlop={5}
              style={defaultStyle.logo}
              onPress={handleMore}>
              <Icon
                name={IconType.Dots}
                size={20}
                color={themeVariables.eva[ThemeKeys.colorWhite]}
              />
            </Pressable>
          </View>
          <AvatarWithName
            name={CustomerDataProvider.Data.companyName ?? ''}
            label={t(LangKeys.label_greeting_text)}
          />
        </View>
        <Card
          style={[
            layoutStyles.horizontalMargin,
            layoutStyles.marginTopLarge,
            layoutStyles.marginBottomMedium,
          ]}>
          <Form.Context value={{control}}>
            <Form.InputPassword
              name={'password'}
              placeholder={t(LangKeys.input_password)}
              style={layoutStyles.marginTopSmall}
              maxLength={MAX_LENGTH.PASSWORD}
              inputMode="numeric"
            />
            <Form.InputNumber
              name={'userCustomerNumber'}
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
              disabled={!formState.isValid}
              style={layoutStyles.marginTopBase}
              onPress={handleSubmit(_handleSubmit)}
              status={'primary'}
            />
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
        </Card>
      </KeyboardAwareScrollView>
      <BottomCard
        style={[
          shownRegisterCard
            ? layoutStyles.displayFlex
            : layoutStyles.displayNone,
        ]}
        text={t(LangKeys.button_login_with_different_user)}
        onPress={handleRegister}
      />
    </View>
  );
}
