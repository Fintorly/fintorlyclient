import { SafeAreaView, StyleSheet, Animated } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { hideHud, showHud } from '../../Hud/HudHelper';
import { ThemeKeys } from '../../Theme/ThemeKeys';
import { useStyle } from '../../Theme/ThemeHelper';
import NavigatorContext from '../../Navigator/NavigatorContext';
import AnimatedLottieView from 'lottie-react-native';
import { GoToOnBoardOne } from '../../Navigator/Router';

type Props = {}

const Splash = (props: Props) => {
    const { themeVariables } = useStyle();
    const animationProgress = useRef(new Animated.Value(0))
    const { setActiveStack } = useContext(NavigatorContext)

    return (
        <SafeAreaView style={[{ backgroundColor: themeVariables.eva[ThemeKeys.colorPrimaryBackground] }, styles.container]} >
            <AnimatedLottieView
                style={{
                    flex: 1,
                }}
                source={require('../../Assets/splashscreen.json')}
                progress={animationProgress.current}
                onAnimationFinish={() => {
                    setActiveStack("auth")
                }}
                autoPlay
                loop={false}
            />
        </SafeAreaView>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: wp('20%'),
        height: hp('20%'),
        resizeMode: 'contain',
    }
})