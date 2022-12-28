import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { useStyle } from '../../Theme/ThemeHelper';
import { ThemeKeys } from '../../Theme/ThemeKeys';
import { REGISTER_OTP_COUNTDOWN } from '../../Helper/Constants';

type Props = {
    hasTimer?: boolean;
    timer?: number;
    hasError?: boolean;
    onCodeFilled?: (code: string) => void;
}

const OtpInput = (props: Props) => {
    const [timer, setTimer] = useState(REGISTER_OTP_COUNTDOWN)
    const [code, setCode] = useState('')
    const themeVariables = useStyle();
    const timerRef = useRef(timer);

    useEffect(() => {
        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                clearInterval(timerId);
            } else {
                setTimer(timerRef.current);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, [timerRef.current]);

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
                    borderColor: props.hasError ? themeVariables.themeVariables.eva[ThemeKeys.colorInputError] : themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryBackground],
                    backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorInputBackground],
                    width: wp('14%'),
                    height: hp('8%'),
                    borderRadius: 12,
                    fontSize: wp('5%'),
                    fontFamily: themeVariables.themeVariables.fonts.semiBold,
                    color: props.hasError ? themeVariables.themeVariables.eva[ThemeKeys.colorInputError] : themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryOrange],
                }}
                codeInputHighlightStyle={{
                    borderColor: props.hasError ? themeVariables.themeVariables.eva[ThemeKeys.colorInputError] : themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryOrange],
                    backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryBackground],
                    fontFamily: themeVariables.themeVariables.fonts.extraBold,
                }}
                onCodeFilled={props.onCodeFilled}
            />
            {
                props.hasTimer &&
                <TouchableOpacity style={styles.countdown}
                    disabled={timer != 0 && true}
                    onPress={() => {
                        timerRef.current = REGISTER_OTP_COUNTDOWN;
                        setTimer(timerRef.current);
                    }
                    } >
                    <Text style={{
                        color: timer != 0 ? themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400] : themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                        fontFamily: themeVariables.themeVariables.fonts.semiBold,
                        fontSize: wp('4%'),
                        marginTop: hp('1.5%'),
                    }}
                    >
                        {timer} | Tekrar Gönder
                    </Text>
                </TouchableOpacity>
            }
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