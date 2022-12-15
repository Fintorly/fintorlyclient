import React from 'react';
import {View, Platform, Pressable} from 'react-native';
import {useStyle} from '~/Theme/ThemeHelper';
import {Card} from '~/Components/Card';
import GreetingText from '~/Components/GreetingText';
import {useState} from 'react';
import KeyboardAwareScrollView from '~/Components/KeyboardAwareScrollView';
import Logo from '~/Components/Logo';
import {Icon} from '@ui-kitten/components';
import IconType from '~/Styles/IconType';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import Text from '~/Components/Text';
import {TabView} from '~/Components/TabView';
import {DefaultStyles} from './Login.styles';
import {LoginCorporate} from './LoginCorporate';
import {LoginIndividual} from './LoginIndividual';
import {useTranslation} from 'react-i18next';
import {LangKeys} from '~/Locale/LangKeys';
import {GoToFeed, GoToInformation} from '~/Navigator/Router';
import {LoginUserType} from '~/Common/enums/user';
import {handleLinking} from '~/Helpers/LinkingHelper';
import {CommonUrl, CommonUrlschema} from '~/Common/constants/url';

export function Login() {
  const {layoutStyles, themeVariables} = useStyle();
  const defaultStyle = DefaultStyles();
  const {t} = useTranslation();

  const [shownRegisterCard, setShownRegisterCard] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<LoginUserType>(0);

  const toggleRegisterCard = (isVisible: boolean) => {
    Platform.OS === 'android' &&
      isVisible !== shownRegisterCard &&
      setShownRegisterCard(isVisible);
  };
  const getTabInfo = [
    {
      title: t(LangKeys.personal),
      content: LoginIndividual(activeTab === LoginUserType.Individual),
    },
    {
      title: t(LangKeys.corporate),
      content: LoginCorporate(activeTab === LoginUserType.Corparate),
    },
  ];
  const handleShowAdvertise = () => {
    GoToFeed();
  };
  const handleApply = () => {
    handleLinking(
      activeTab !== LoginUserType.Individual
        ? CommonUrlschema.BeCorporateCustomer
        : CommonUrlschema.BeIndividualCustomer,
    ).catch(() => handleLinking(CommonUrl.ZiraatApp));
  };
  const renderFooter = () => {
    return (
      <View style={defaultStyle.footerContainer}>
        <Card
          onPress={handleApply}
          radiusType="full"
          bgType="white"
          style={[defaultStyle.footerCard, defaultStyle.firstFooterCard]}>
          <Icon
            name={IconType.Documents}
            color={themeVariables.eva[ThemeKeys.colorWhite]}
            size={30}
          />
          <Text category="c2" appearance="light" style={defaultStyle.cardText}>
            {t(LangKeys.button_register)}
          </Text>
        </Card>

        <Card
          onPress={handleShowAdvertise}
          radiusType="full"
          bgType="white"
          style={defaultStyle.footerCard}>
          <Icon
            name={IconType.Advertise}
            color={themeVariables.eva[ThemeKeys.colorWhite]}
            size={30}
          />
          <Text category="c2" appearance="light" style={defaultStyle.cardText}>
            {t(LangKeys.button_show_advertise_without_login)}
          </Text>
        </Card>
      </View>
    );
  };

  const handleMore = () => {
    GoToInformation();
  };

  const handleTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <KeyboardAwareScrollView
      enableResetScrollToCoords={false}
      onKeyboardDidShow={() => {
        toggleRegisterCard(false);
      }}
      onKeyboardDidHide={() => {
        toggleRegisterCard(true);
      }}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={100}
      bounces={false}
      contentContainerStyle={[
        layoutStyles.flexGrow,
        layoutStyles.justifySpaceAround,
        layoutStyles.bottomPadding,
      ]}>
      <View style={layoutStyles.alignCenter}>
        <View style={defaultStyle.logoContainer}>
          <Logo size={40} />
          <Pressable hitSlop={5} style={defaultStyle.logo} onPress={handleMore}>
            <Icon
              name={IconType.Dots}
              size={20}
              color={themeVariables.eva[ThemeKeys.colorWhite]}
            />
          </Pressable>
        </View>

        <GreetingText
          text={t(LangKeys.greeting_text_main)}
          subText={t(LangKeys.greeting_text_sub)}
          size="large"
          textCategory="hero2"
          subTextCategory="p2"
          subTextStyle={layoutStyles.marginTopSmall}
          containerStyle={[
            layoutStyles.marginTopSmall,
            layoutStyles.horizontalPadding,
          ]}
        />
      </View>
      <Card style={[layoutStyles.horizontalMargin, layoutStyles.marginTopBase]}>
        <TabView
          container={layoutStyles.marginTopMedium}
          titleStyle={defaultStyle.tabTitle}
          tabBarStyle={defaultStyle.tabBar}
          contentContainerStyle={layoutStyles.marginTopMedium}
          onSelect={handleTab}
          data={getTabInfo}
        />
      </Card>
      {renderFooter()}
    </KeyboardAwareScrollView>
  );
}
