import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef } from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { useStyle } from '../../Theme/ThemeHelper';
import { ThemeKeys } from '../../Theme/ThemeKeys';
import CountDown from 'react-native-countdown-component';
import { REGISTER_OTP_COUNTDOWN } from '../../Helper/Constants';

type Props = {}

const OtpInput = (props: Props) => {
    const [timer, setTimer] = useState(REGISTER_OTP_COUNTDOWN)
    const [code, setCode] = useState('')
    const [disabled, setDisabled] = useState(true)
    const themeVariables = useStyle();
    const countdownRef = useRef(null);
    console.log(timer)
    return (
        <View>
            <OTPInputView
                editable={true}
                style={styles.inputArea}
                pinCount={5}
                code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={code => { setCode(code) }}
                autoFocusOnLoad
                selectionColor={themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryOrange]}
                codeInputFieldStyle={{
                    borderColor: themeVariables.themeVariables.eva[ThemeKeys.colorInputBackground],
                    backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorInputBackground],
                    width: wp('14%'),
                    height: hp('8%'),
                    borderRadius: 12,
                    fontSize: wp('5%'),
                    fontFamily: themeVariables.themeVariables.fonts.semiBold,
                }}
                codeInputHighlightStyle={{
                    borderColor: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryOrange],
                    backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryBackground],
                    fontFamily: themeVariables.themeVariables.fonts.extraBold,
                }}
                onCodeFilled={(code => {
                    console.log(`Code is ${code}`)
                })}
            />
            <TouchableOpacity style={styles.countdown}
                disabled={disabled}
                onPress={() => { setTimer(REGISTER_OTP_COUNTDOWN); }
                } >
                {/* <CountDown
                    ref={countdownRef}
                    until={timer}
                    initialSeconds={REGISTER_OTP_COUNTDOWN}
                    onChange={(time) => setTimer(time)}
                    onFinish={() => setDisabled(false)}
                    digitStyle={{ backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryBackground] }}
                    digitTxtStyle={{ color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400] }}
                    timeToShow={['S']}
                    timeLabels={{ "s": null }}
                    size={wp('4.5%')}
                /> */}
                <Text style={{
                    color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400],
                    fontFamily: themeVariables.themeVariables.fonts.semiBold,
                    fontSize: wp('4%'),
                }}
                >
                    | Tekrar Gönder
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default OtpInput

const styles = StyleSheet.create({
    inputArea: {
        justifyContent: 'center',
        marginHorizontal: wp('10%'),
        height: hp('9%'),
        marginTop: hp('6%'),
    },
    countdown: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});