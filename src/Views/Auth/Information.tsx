import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {CALL_CENTER_NO} from '~/Common/constants/appInfo';
import {ConfirmModal, ConfirmModalRefType} from '~/Components/ConfirmModal';
import Repeater from '~/Components/Repeater';
import RowButton, {RowButtonPropsTypes} from '~/Components/RowButton';
import {handleLinking} from '~/Helpers/LinkingHelper';
import {removeSpaces} from '~/Helpers/Validation';
import {LangKeys} from '~/Locale/LangKeys';
import {GoToAbout} from '~/Navigator/Router';
import IconType from '~/Styles/IconType';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';

export function Information() {
  const {layoutStyles, themeVariables} = useStyle();
  const {t} = useTranslation();
  const confirmModalRef = useRef<ConfirmModalRefType>(null);

  const handleAbout = () => {
    GoToAbout();
  };
  const handleContact = () => {
    confirmModalRef?.current?.show();
  };

  const informationData: RowButtonPropsTypes[] = [
    {
      text: t(LangKeys.contact_center),
      leftIcon: IconType.Phone,
      onPress: handleContact,
    },
    {
      text: t(LangKeys.about_app),
      leftIcon: IconType.InfoWithCircle,
      onPress: handleAbout,
    },
  ];
  const handleApprove = () => {
    handleLinking(`tel:${removeSpaces(CALL_CENTER_NO)}`);
  };

  return (
    <View
      style={[
        layoutStyles.bgWhite,
        layoutStyles.fullscreenContainer,
        layoutStyles.horizontalPadding,
        layoutStyles.paddingTopSmall,
      ]}>
      <Repeater items={informationData}>
        {(item) => <RowButton {...item} />}
      </Repeater>
      <ConfirmModal
        ref={confirmModalRef}
        icon={IconType.Phone}
        iconColor={themeVariables.eva[ThemeKeys.colorBlack]}
        iconStyle={{
          transform: [{rotateY: '180deg'}],
        }}
        iconSize={36}
        approveText={t(LangKeys.ok)}
        declineText={t(LangKeys.common_cancel)}
        message={t(LangKeys.label_call_contact_center)}
        title={CALL_CENTER_NO}
        onApprove={handleApprove}
      />
    </View>
  );
}
