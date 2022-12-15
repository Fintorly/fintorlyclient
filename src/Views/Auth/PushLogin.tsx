import React, {useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, ViewStyle} from 'react-native';
import Button from '~/Components/Button';
import {LangKeys} from '~/Locale/LangKeys';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import {useStyle} from '~/Theme/ThemeHelper';
import AuthActions from '~/Api/AuthActions';
import {handleError} from '~/Helpers/ErrorHandler';
import Text from '~/Components/Text';
import KeyboardAwareScrollView from '~/Components/KeyboardAwareScrollView';
import AvatarWithName from '~/Components/AvatarWithName';
import DefaultStyles, {MessageStyle} from './PushLogin.styles';
import LoadingGif from '~/Components/LoadingGif';
import moment from 'moment';
import {ApproveStatus} from '~/Common/enums/login';
import {GoToLoginRequirements, GoToOtp} from '~/Navigator/Router';
import {hideHud, showHud} from '~/Hud/HudHelper';
import {LoginResponseType} from '~/Common/types/login';
import UserContext from '~/Context/UserContext';
import CustomerDataProvider from '~/Providers/CustomerDataProvider';
import {DateFormat} from '~/Common/enums/date';
import {ConfirmModal, ConfirmModalRefType} from '~/Components/ConfirmModal';
import MobileApi from '~/Api/MobileApi';
import {getUserAccessType} from '~/Helpers/User';
import {navigatorRef} from '~/Navigator/NavigatorRefs';
import {LoginUserType} from '~/Common/enums/user';
import IconType from '~/Styles/IconType';

export function PushLogin(props: DefaultNavigationProps<'Otp'>) {
  const {route} = props;
  const {setUserInfo} = useContext(UserContext);
  const defaultStyles = DefaultStyles();
  const messageStyle = MessageStyle();
  const {layoutStyles, componentStyles} = useStyle();
  const WAITING_APPROVE_TIME = 40; // second
  const {t} = useTranslation();
  const confirmModalRef = useRef<ConfirmModalRefType>(null);
  const pushLoginIntervalRef = useRef<NodeJS.Timeout>();
  const hasActivePushLoginRequest = useRef(false);
  const initalRequestTime = useRef<moment.Moment>();
  const [shownButtons, setShownButtons] = useState<boolean>(false);
  const [date, setDate] = useState<string>(
    moment().format(DateFormat.DATE_LONG),
  );
  const {
    shouldSaveUser,
    loginUserType,
    isDocumentConfirmed,
    isShowedApprovementScreen,
    customerIdentifier,
    companyName,
    name,
    surname,
    userCustomerNumber,
    isSubCustomer,
    isMainCustomerDocumentConfirmed,
    isMainCustomerShowedApprovementScreen,
  } = route?.params;

  const handleApproved = (token: string) => {
    AuthActions.updateToken(token);
    MobileApi.me
      .getApprovment()
      .then((meResponse) => {
        const accessType = getUserAccessType(meResponse.data);
        const userInfo: LoginResponseType = {
          name: meResponse.data.name,
          surname: meResponse.data.surname,
          companyName: companyName,
          userLoginType: loginUserType,
          isDocumentConfirmed: isDocumentConfirmed,
          isShowedApprovementScreen: isShowedApprovementScreen,
          isSubCustomer: isSubCustomer,
          isMainCustomerDocumentConfirmed: isMainCustomerDocumentConfirmed,
          isMainCustomerShowedApprovementScreen:
            isMainCustomerShowedApprovementScreen,
          id: meResponse.data.id,
          customerStatus: meResponse.data.customerStatus,
        };
        setUserInfo({
          ...userInfo,
          userAccessType: accessType,
        });
        if (shouldSaveUser) {
          CustomerDataProvider.Data.customerIdentifier = customerIdentifier;
          CustomerDataProvider.Data.name = meResponse.data.name;
          CustomerDataProvider.Data.surname = meResponse.data.surname;
          CustomerDataProvider.Data.companyName = companyName ?? '';
          CustomerDataProvider.Data.customertype = loginUserType;
          CustomerDataProvider.Data.memberCustomerNumber = userCustomerNumber;
        }
        GoToLoginRequirements();
      })
      .catch((error) =>
        handleError(error, () => {
          navigatorRef.current?.changeActiveStack('splash');
        }),
      );
  };

  const handlePushLoginError = () => {
    clearPushLoginInterval();
    confirmModalRef?.current?.show();
    setShownButtons(true);
  };

  const getLoginStatus = () => {
    hasActivePushLoginRequest.current = true;
    AuthActions.pushLoginGet()
      .then((response) => {
        switch (response.data.data?.approveStatus) {
          case ApproveStatus.Approved:
            clearPushLoginInterval();
            handleApproved(response.headers.authorization);
            return;
          case ApproveStatus.Denied:
          case ApproveStatus.Expired:
          case ApproveStatus.NoTransactionFoundToConfirm:
          case ApproveStatus.Unspecified:
            return handlePushLoginError();
          case ApproveStatus.WaitingForApproval:
          default:
            return;
        }
      })
      .catch(handlePushLoginError)
      .finally(() => {
        hasActivePushLoginRequest.current = false;
      });
  };

  const clearPushLoginInterval = () => {
    clearInterval(pushLoginIntervalRef.current);
  };

  const startPushLoginInterval = (initialRequestTime: moment.Moment) => {
    initalRequestTime.current = initialRequestTime;
    pushLoginIntervalRef.current = setInterval(
      handlePushLoginIntervalChange,
      1000,
    );
  };

  const handlePushLoginIntervalChange = () => {
    if (
      moment().diff(initalRequestTime.current, 'second') > WAITING_APPROVE_TIME
    ) {
      return handlePushLoginError();
    }

    if (!hasActivePushLoginRequest.current) {
      getLoginStatus();
    }
  };

  useEffect(() => {
    startPushLoginInterval(moment());
    return () => clearPushLoginInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResetTimer = () => {
    const newInitialMoment = moment();
    setDate(newInitialMoment.format(DateFormat.DATE_LONG));
    AuthActions.pushLogin({
      procesTime: newInitialMoment.toISOString(),
    })
      .then((response) => {
        setShownButtons(false);
        AuthActions.updateToken(response.headers.authorization);
        startPushLoginInterval(newInitialMoment);
      })
      .catch(handleError);
  };

  const handleTryOTP = () => {
    showHud();
    AuthActions.createOtp()
      .then((otpResponse) => {
        GoToOtp({
          ...route.params,
          ...otpResponse.data,
        });
      })
      .catch(handleError)
      .finally(hideHud);
  };

  const renderFooter = () => {
    if (!shownButtons) {
      return (
        <View
          style={[
            layoutStyles.justifyCenter,
            layoutStyles.alignCenter,
            layoutStyles.marginTopBase,
          ]}>
          <LoadingGif show type="loader" gifStyle={defaultStyles.gif} />
          <Text
            style={[layoutStyles.marginTopBase]}
            category="label"
            appearance="light">
            {t(LangKeys.push_login_loader_contnet)}
          </Text>
        </View>
      );
    }
    return (
      <View
        style={[
          layoutStyles.justifyCenter,
          layoutStyles.alignCenter,
          layoutStyles.marginTopBase,
          defaultStyles.button,
        ]}>
        <Button
          label={t(LangKeys.button_try_agian).toLocaleUpperCase()}
          buttonType="rounded"
          status="primary"
          style={[layoutStyles.marginTopBase, defaultStyles.button]}
          onPress={handleResetTimer}
        />
        <Button
          label={t(LangKeys.button_login_by_otp).toLocaleUpperCase()}
          buttonType="rounded"
          status="primary"
          style={[layoutStyles.marginTopBase, defaultStyles.button]}
          onPress={handleTryOTP}
        />
      </View>
    );
  };

  const getFullName = () => {
    switch (loginUserType) {
      case LoginUserType.Corparate:
        return companyName;
      case LoginUserType.Individual:
      default:
        return [name, surname].join(' ');
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
          <AvatarWithName
            name={getFullName() as string}
            label={t(LangKeys.label_greeting_text)}
          />
          <Text
            category="label"
            appearance="light"
            style={[
              componentStyles.centerText,
              layoutStyles.marginTopBase,
              defaultStyles.content,
            ]}>
            {t(LangKeys.push_login_content, {
              customerNo: route.params.customerIdentifier,
              date: date,
            })}
          </Text>

          {renderFooter()}
        </View>
      </KeyboardAwareScrollView>
      <ConfirmModal
        ref={confirmModalRef}
        message={t(LangKeys.push_loging_modal_message)}
        title={t(LangKeys.push_login_decline)}
        titleStyle={layoutStyles.marginTopMedium}
        approveText={t(LangKeys.ok)}
        messageStyle={messageStyle as ViewStyle}
        status={'error'}
        icon={IconType.ExclamationBold}
        approveButtonStatus={'secondary'}
      />
    </View>
  );
}
