import {Icon} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import IconType from '~/Styles/IconType';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import DefaultStyles from './About.styles';
import HTMLView from 'react-native-render-html';
import {useTranslation} from 'react-i18next';
import {LangKeys} from '~/Locale/LangKeys';
import {VERSION_NUMBER} from '~/Common/constants/appInfo';
import Text from '~/Components/Text';
// import {handleLinking} from '~/Helpers/LinkingHelper';

export function About() {
  const {layoutStyles, themeVariables} = useStyle();
  const {t} = useTranslation();
  const defaultStyles = DefaultStyles();
  //TODO update sonrasında kontrol edilecek

  return (
    <View
      style={[
        layoutStyles.bgWhite,
        layoutStyles.fullscreenContainer,
        layoutStyles.horizontalPadding,
      ]}>
      <View
        style={[
          layoutStyles.marginTopExtraLarge,
          layoutStyles.fullscreenContainer,
          layoutStyles.alignCenter,
        ]}>
        <View style={[defaultStyles.iconContainer]}>
          <Icon
            size={36}
            color={themeVariables.eva[ThemeKeys.colorPrimary]}
            name={IconType.Information}
          />
        </View>

        <View
          style={[defaultStyles.textContainer, layoutStyles.marginTopLarge]}>
          <HTMLView
            tagsStyles={defaultStyles}
            source={{
              html: t(LangKeys.label_about_content),
            }}
          />
        </View>
        <View
          style={[defaultStyles.versionContainer, layoutStyles.marginTopBase]}>
          <Text appearance="ink" category="p1">
            {t(LangKeys.label_version_number)}
          </Text>
          <Text appearance="ink" category="label">
            {VERSION_NUMBER}
          </Text>
        </View>
      </View>
    </View>
  );
}
