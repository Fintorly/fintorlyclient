import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useStyle } from '../../Theme/ThemeHelper'
import { ThemeKeys } from '../../Theme/ThemeKeys'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

type Props = {
    text: string
    style?: any
    textStyle?: any
    width?: any
    onPress?: () => void
    disabled?: boolean
}

const Button = (props: Props) => {
    const themeVariables = useStyle();
    return (
        <TouchableOpacity
            style={[props.style, {
                backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryGray],
                alignSelf: 'center',
                width: props.width,
                borderRadius: 10,
            }]}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text
                style={[props.textStyle, {
                    color: props.disabled ? themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400] : themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                    fontFamily: themeVariables.themeVariables.fonts.extraBold,
                    fontSize: wp('4.5%'),
                    textAlign: 'center',
                    marginVertical: hp('2.2%'),
                    paddingHorizontal: wp('15%'),
                }]}
            >{props.text}</Text>
        </TouchableOpacity>
    )
}

export default Button

