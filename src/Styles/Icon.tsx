import { TouchableOpacity } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'

type Props = {
    name: string
    style: any
    loop?: boolean
    autoPlay?: boolean
    width: number
    height: number
    onPress?: () => void
}

const Icon = (props: Props) => {
    const icons = {
        check: require('../Assets/icons/check.json'),
        wrong: require('../Assets/icons/wrong.json'),
        eye: require('../Assets/icons/eye.json'),
        eyeoff: require('../Assets/icons/eye-off.json'),
        bitcoinman: require('../Assets/icons/bitcoin-man-onboard.json'),
        bot: require('../Assets/icons/bot-onboard.json'),
        crypto: require('../Assets/icons/crypto-onboard.json'),
        news: require('../Assets/icons/news-onboard.json'),
    }
    return (
        <TouchableOpacity style={props.style} onPress={props.onPress}   >
            <AnimatedLottieView
                style={{ width: props.width, height: props.height }}
                source={icons[props.name]}
                autoPlay={props.autoPlay}
                loop={props.loop}
                renderMode='HARDWARE'
            />
        </TouchableOpacity>
    )
}

export default Icon

