import React from "react";
import { ProgressBar } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
type Props = {
    progress: number,
    progressColor: string,
    backgroundColor: string,
}

const ProgresBar = (props: Props) => {
    return (
        <ProgressBar progress={props.progress} color={props.progressColor}
            collapsable={true}
            pointerEvents="box-only"
            style={{
                height: wp('2%'),
                marginTop: hp('1%'),
                backgroundColor: props.backgroundColor,
                borderRadius: wp('1%'),
                marginHorizontal: wp('5%'),
            }}
        />
    )
}

export default ProgresBar
