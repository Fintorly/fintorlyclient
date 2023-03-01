import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStyle } from '../../Theme/ThemeHelper';
import { ThemeKeys } from '../../Theme/ThemeKeys';
import {
    widthPercentageToDP
        as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProgresBar from '../../Components/ProgressBar';
import Button from '../../Components/Button';
import { GoToCreateProfileFinish } from '../../Navigator/Router';
  
type Props = {
    userType: number
}

const CreateProfileInterested = (props: Props) => {
    const themeVariables = useStyle();
    const [progress, setProgress] = useState(0.6);
    const userType = props.route.params.userType;

    const data = [
        { firstLetter: 'BTC', displayName: 'Bitcoin', name: 'btc' },
        { firstLetter: 'ETH', displayName: 'Ehtereum', name: 'eth' },
    ];

    useEffect(() => {
        setTimeout(() => {
            setProgress(0.8)
        }, 1000);
    }), []

    return (
        <SafeAreaView style={[styles.container, {
            backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryBackground]
        }]} >
            <ProgresBar
                backgroundColor={themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400]}
                progressColor={themeVariables.themeVariables.eva[ThemeKeys.colorNeutralWhite200]}
                progress={progress}
            />
            <View style={styles.topTitleArea} >
                <Text style={[styles.title, {
                    color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                    fontFamily: themeVariables.themeVariables.fonts.extraBold,
                }]}>İlgilendikleriniz</Text>

                <Text
                    style={[styles.desc, {
                        color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400],
                        fontFamily: themeVariables.themeVariables.fonts.medium,
                    }]}
                >Kripto paralar, tokenler hakkında ne kadar bilgilisin?</Text>
            </View>

            <View>
                <MultiSelectView
                    // ref='list1'
                    // onSelectionStatusChange={this.onSelectionStatusChange}
                    data={data}
                    valueKey={'value'}
                />

                <Button
                    onPress={() => {
                        userType === 1 ? GoToCreateProfileFinish({ userType: userType }) : GoToCreateProfileFinish({ userType: userType })
                    }}
                    text='İlerle'
                    // disabled={true}
                    style={{
                        marginTop: hp('3%'),
                    }}
                />
            </View>

        </SafeAreaView>
    )
}

export default CreateProfileInterested

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topTitleArea: {
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
        marginTop: hp('2%'),
        marginBottom: hp('3%'),
    },
    topTitle: {
        flexDirection: 'row',
    },
    title: {
        fontSize: wp('7%'),
    },
    desc: {
        fontSize: wp('4.5%'),
        marginTop: hp('1%'),
    },
    backButton: {
        alignSelf: 'center',
    },
    chooseProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
    },
    profileTitle: {
        fontSize: wp('5%'),
        marginTop: hp('1%'),
    }
})