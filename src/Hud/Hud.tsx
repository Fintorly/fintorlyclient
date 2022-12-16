import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyle } from '../Theme/ThemeHelper';
import { Animated, Easing } from 'react-native';
import Lottie from 'lottie-react-native';


export type HudRefType = {
  show: () => void;
  hide: () => void;
  forceHide: () => void;
};

const Hud = React.forwardRef(({ }, ref?: React.Ref<HudRefType>) => {
  const [activeHudCount, setActiveHudCount] = useState(0);

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

  const animationProgress = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }, [])

  console.log(shouldShowHud())
  return shouldShowHud() ? (
    <Lottie
      style={
        {
          flex: 1,
        }
      }
      source={require('../Assets/9844-loading-40-paperplane.json')}
      progress={animationProgress.current}
      autoPlay
      loop
    />
  ) : null;
});

export default Hud;
