/* eslint-disable no-bitwise */
import React, {useContext, useEffect, useMemo} from 'react';
import {View, FlatList} from 'react-native';
import {useStyle} from '~/Theme/ThemeHelper';
import {Card} from '~/Components/Card';
import Text from '~/Components/Text';
import {useTranslation} from 'react-i18next';
import {LangKeys} from '~/Locale/LangKeys';
import Button from '~/Components/Button';
import KeyboardAwareScrollView from '~/Components/KeyboardAwareScrollView';
import InfoWithTooltip from '~/Components/InfoWithTooltip';
import AvatarWithName from '~/Components/AvatarWithName';
import NavigatorContext from '~/Navigator/NavigatorContext';
import UserContext from '~/Context/UserContext';
import {accessibilityList} from '~/Common/constants/documents';
import _ from 'lodash';
import Repeater from '~/Components/Repeater';
import {AccessibilityInfoType} from '~/Common/enums/document';
import {accessibilityContent} from '~/Helpers/AccesibilityInfo';
import {AccessibilityItemType} from '~/Common/types/documents';
import MobileApi from '~/Api/MobileApi';
import {hideHud, showHud} from '~/Hud/HudHelper';
import {handleError} from '~/Helpers/ErrorHandler';
import {globalConfirmModalRef} from '~/Components/GlobalConfirmModal';
import IconType from '~/Styles/IconType';
import {handleLinking} from '~/Helpers/LinkingHelper';
import {CommonUrl} from '~/Common/constants/url';
import {CustomerStatus} from '~/Mobile-Api';

export function AccessibilityInfo() {
  const {layoutStyles} = useStyle();
  const {t} = useTranslation();
  const {setActiveStack} = useContext(NavigatorContext);
  const allList: AccessibilityItemType[] = accessibilityList;
  const {userInfo, setUserInfo} = useContext(UserContext);
  const confirmModal = globalConfirmModalRef.current!;

  const updateScreenStatus = () => {
    showHud();
    MobileApi.approvement
      .updateScreenStatus()
      .catch(handleError)
      .finally(hideHud);
  };

  useEffect(() => {
    updateScreenStatus();
  }, []);

  const handleBeCustomer = () => {
    handleLinking(CommonUrl.BecomeBankkartMember);
  };

  const continueProcess = () => {
    confirmModal.hide();
    handleShowAdvertise();
  };

  const handleBeApprovedUser = () => {
    const handleDecline = () => {
      confirmModal.hide();
    };
    const handleApprove = () => {
      confirmModal.hide();
      showHud();
      MobileApi.approvement
        .updateStatus()
        .then(() => {
          setUserInfo({...userInfo, customerStatus: CustomerStatus.Pending});
          confirmModal.show({
            approveText: t(LangKeys.button_show_advertise),
            message: t(LangKeys.message_be_approved_user),
            title: t(LangKeys.title_be_approved_user),
            titleStyle: layoutStyles.marginTopMedium,
            messageStyle: layoutStyles.marginTopSmall,
            status: 'success',
            icon: IconType.ResultInfo,
            approveButtonStatus: 'secondary',
            onApprove: continueProcess,
          });
        })
        .catch(handleError)
        .finally(hideHud);
    };
    confirmModal.show({
      title: t(LangKeys.request_will_be_received),
      approveText: t(LangKeys.button_approve),
      status: 'success',
      declineText: t(LangKeys.button_cancel),
      hideCloseIcon: true,
      icon: IconType.ApproveLetter,
      onApprove: handleApprove,
      onDecline: handleDecline,
    });
  };

  const handleShowAdvertise = () => {
    setUserInfo({
      ...userInfo,
      isShowedApprovementScreen: true,
    });
    setActiveStack('postLogin');
  };
  const getList = useMemo(() => {
    return _.reduce(
      allList as AccessibilityItemType[],
      (prev, item) => {
        if (item.accesType & userInfo?.userAccessType) {
          prev.acceptedTransactionsList.push(item);
          return prev;
        }
        prev.unacceptableTransactionsList.push(item);
        return prev;
      },
      {
        acceptedTransactionsList: [] as AccessibilityItemType[],
        unacceptableTransactionsList: [] as AccessibilityItemType[],
      },
    );
  }, [allList, userInfo?.userAccessType]);

  const acceptedTransactionsList: AccessibilityItemType[] =
    getList.acceptedTransactionsList;
  const unacceptableTransactionsList: AccessibilityItemType[] =
    getList.unacceptableTransactionsList;

  const renderTransactions = (
    data: AccessibilityItemType[],
    isAccepted = true,
  ) => {
    return (
      <FlatList
        bounces={false}
        style={[layoutStyles.bgWhite, layoutStyles.marginTopBase]}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponentStyle={layoutStyles.marginTopBase}
        ListFooterComponent={() => {
          return (
            <Text>
              {isAccepted
                ? t(LangKeys.label_accepted_transactions)
                : t(LangKeys.label_unaccepted_transactions)}
            </Text>
          );
        }}
        renderItem={({item}) => {
          return (
            <InfoWithTooltip
              isApproved={isAccepted}
              label={t(item.label)}
              message={t(item.message)}
            />
          );
        }}
      />
    );
  };

  enum ButtonTypes {
    beCustomer,
    beApprovedUser,
    showAdvertise,
  }
  const getButtons = () => {
    const _userAccessType = userInfo?.userAccessType;
    return [
      {
        title: t(LangKeys.button_be_customer_bankkart).toLocaleUpperCase(),
        onPress: handleBeCustomer,
        key: ButtonTypes.beCustomer,
        shown: !(
          _userAccessType & AccessibilityInfoType.agriculturalInputSales
        ),
      },
      {
        title: t(LangKeys.button_approved_user).toLocaleUpperCase(),
        onPress: handleBeApprovedUser,
        key: ButtonTypes.beApprovedUser,
        shown: true,
        disabled: !(
          userInfo.customerStatus === CustomerStatus.None ||
          userInfo.customerStatus === CustomerStatus.Rejected
        ),
      },
      {
        title: t(LangKeys.button_show_advertise).toLocaleUpperCase(),
        onPress: handleShowAdvertise,
        key: ButtonTypes.showAdvertise,
        shown: true,
        status: 'secondary',
      },
    ];
  };
  const renderContent = () => {
    const _userAccessType = userInfo.userAccessType;
    const isContainProduct =
      _userAccessType &
      (AccessibilityInfoType.agriculturalProductSales |
        AccessibilityInfoType.agriculturalProductPurchase);
    const _content = accessibilityContent(_userAccessType);

    return (
      <Text appearance="ink" category="p1" style={layoutStyles.marginTopSmall}>
        {isContainProduct && t(_content)}
      </Text>
    );
  };

  return (
    <View
      style={[
        layoutStyles.fullscreenContainer,
        layoutStyles.horizontalPadding,
        layoutStyles.marginTopHuge,
      ]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={[
          layoutStyles.flexGrow,
          layoutStyles.bottomPadding,
        ]}>
        <AvatarWithName
          name={[userInfo.name, userInfo.surname].join(' ')}
          label={t(LangKeys.label_greeting_text)}
        />
        <Card
          style={[
            layoutStyles.marginTopLarge,
            layoutStyles.marginBottomMedium,
          ]}>
          <Text>{t(LangKeys.label_information)} </Text>
          {acceptedTransactionsList &&
            acceptedTransactionsList.length > 0 &&
            renderTransactions(acceptedTransactionsList)}
          {unacceptableTransactionsList &&
            unacceptableTransactionsList.length > 0 &&
            renderTransactions(unacceptableTransactionsList, false)}
          {renderContent()}
          <Repeater items={getButtons()}>
            {(item) => {
              return (
                <Button
                  label={item.title}
                  buttonType="rounded"
                  status={item.status ?? 'primary'}
                  disabled={item?.disabled}
                  style={[
                    layoutStyles.marginTopBase,
                    !item.shown && layoutStyles.displayNone,
                  ]}
                  onPress={item.onPress}
                />
              );
            }}
          </Repeater>
        </Card>
      </KeyboardAwareScrollView>
    </View>
  );
}
