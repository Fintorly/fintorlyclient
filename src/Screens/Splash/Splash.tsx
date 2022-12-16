import { Animated, Easing, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AnimatedLottieView from 'lottie-react-native';

type Props = {}

const Splash = (props: Props) => {

    return (
        <SafeAreaView style={styles.container} >
            {/* <Image style={styles.logo} source={require('../../Assets/logo/fintologo.png')} /> */}
            <AnimatedLottieView
                style={styles.logo}
                source={require('../../Assets/9844-loading-40-paperplane.json')}
                autoPlay
                loop={true}
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
        backgroundColor: '#1e1e1e',
    },
    logo: {
        width: wp('20%'),
        height: hp('20%'),
        resizeMode: 'contain',
    }
})