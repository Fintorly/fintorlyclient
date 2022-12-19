import React, {  useImperativeHandle, useRef, useState } from 'react';
import { Animated } from 'react-native';
import Lottie from 'lottie-react-native';
import { useStyle } from '../Theme/ThemeHelper';
import { ThemeKeys } from '../Theme/ThemeKeys';
import { widthPercentageToDP } from 'react-native-responsive-screen';


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
  const { themeVariables } = useStyle();
  return shouldShowHud() ? (
    <Lottie
      style={{
        flex: 1,
        backgroundColor: themeVariables.eva[ThemeKeys.colorHudBackground],
      }}
      source={require('../Assets/loading.json')}
      progress={animationProgress.current}
      autoPlay
      loop
    />
  ) : null;
});

export default Hud;
