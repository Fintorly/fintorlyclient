import { SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { hideHud, showHud } from '../../Hud/HudHelper';
import { ThemeKeys } from '../../Theme/ThemeKeys';
import { useStyle } from '../../Theme/ThemeHelper';

type Props = {}

const Splash = (props: Props) => {
    const { themeVariables } = useStyle();
    return (
        <SafeAreaView style={[{ backgroundColor: themeVariables.eva[ThemeKeys.colorPrimaryBackground] }, styles.container]} >
            <Image style={styles.logo} source={require('../../Assets/logo/fintologo.png')} />
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