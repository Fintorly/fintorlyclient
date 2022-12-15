import React, {useEffect, useImperativeHandle, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import HTTPClient from '~/Api/HttpClient';
import Button from '~/Components/Button';
import LoadingGif from '~/Components/LoadingGif';
import {LangKeys} from '~/Locale/LangKeys';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeTypes';
import {useBackHandler} from '@react-native-community/hooks';

export type HudRefType = {
  show: () => void;
  hide: () => void;
  forceHide: () => void;
};

const Hud = React.forwardRef(({}, ref?: React.Ref<HudRefType>) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [activeHudCount, setActiveHudCount] = useState(0);
  const {themeVariables} = useStyle();
  const {t} = useTranslation();

  function showHud() {
    setActiveHudCount(activeHudCount + 1);
  }

  function hideHud() {
    if (activeHudCount !== 0) {
      setActiveHudCount(activeHudCount - 1);
    }
  }

  function forceHideHud() {
    setActiveHudCount(0);
  }

  useImperativeHandle(ref, () => ({
    show: () => showHud(),
    hide: () => hideHud(),
    forceHide: () => forceHideHud(),
  }));

  const shouldShowHud = (): boolean => {
    return activeHudCount > 0;
  };
  const cancelRequest = () => {
    HTTPClient.instance.cancel();
  };

  useEffect(() => {
    if (shouldShowHud()) {
      setShowCloseButton(false);
      const timer = setTimeout(() => {
        setShowCloseButton(true);
      }, 15000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHudCount]);

  useBackHandler(() => {
    if (activeHudCount > 0 && showCloseButton) {
      cancelRequest();
      hideHud();
      setShowCloseButton(false);
      return false;
    } else if (activeHudCount > 0) {
      return true;
    }
    return false;
  });

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: themeVariables.eva[ThemeKeys.colorBlackTransparent500],
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return shouldShowHud() ? (
    <View style={styles.container}>
      <LoadingGif show />
      {showCloseButton && (
        <Button
          onPress={() => {
            cancelRequest();
            hideHud();
          }}
          label={t(LangKeys.stop_loading)}
          buttonType="rounded"
          verticalType="tiny"
          status="secondary"
        />
      )}
    </View>
  ) : null;
});

export default Hud;
