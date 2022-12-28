import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStyle } from '../Theme/ThemeHelper';
import { ThemeKeys } from '../Theme/ThemeKeys';
import {
    widthPercentageToDP
        as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from '../Styles/Icon';
import { GoToCreateProfilePersonelInfo } from '../Navigator/Router';

type Props = {}

const ChooseProfile = (props: Props) => {
    const themeVariables = useStyle();
    return (
        <SafeAreaView style={[styles.container, {
            backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryBackground]
        }]} >
            <View style={styles.topTitleArea} >
                <View style={styles.topTitle} >
                    <Text style={[styles.title, {
                        color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                        fontFamily: themeVariables.themeVariables.fonts.extraBold,
                    }]}>Profilini Seç</Text>
                    <Text
                        style={[styles.backButton, {
                            color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle]
                        }]}
                    >-</Text>
                </View>
                <Text
                    style={[styles.desc, {
                        color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400],
                        fontFamily: themeVariables.themeVariables.fonts.medium,
                    }]}
                >Lütfen aşağıdan sana en uygun olan profil tipini seç..</Text>
            </View>

            <View style={styles.chooseProfile} >
                <TouchableOpacity style={{
                    backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralDarkBlue],
                    width: wp('40%'),
                    height: hp('20%'),
                    alignItems: 'center',
                    borderRadius: 12,
                    justifyContent: 'center',
                }}
                    onPress={() =>
                        GoToCreateProfilePersonelInfo({
                            userType: 1
                        })
                    }
                >
                    <Icon
                        name='mentor'
                        width={wp('20%')}
                        height={hp('10%')}
                        autoPlay
                        loop
                        disabled={true}
                    />
                    <Text
                        style={[styles.profileTitle, {
                            color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                            fontFamily: themeVariables.themeVariables.fonts.medium,
                        }]}
                    >Mentör</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralDarkBlue],
                    width: wp('40%'),
                    height: hp('20%'),
                    alignItems: 'center',
                    borderRadius: 12,
                    justifyContent: 'center',
                }}
                    onPress={() =>
                        GoToCreateProfilePersonelInfo({
                            userType: 2
                        })
                    }>
                    <Icon
                        name='investor'
                        width={wp('20%')}
                        height={hp('10%')}
                        autoPlay
                        loop
                        disabled={true}
                    />
                    <Text
                        style={[styles.profileTitle, {
                            color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                            fontFamily: themeVariables.themeVariables.fonts.medium,
                        }]}
                    >Yatırımcı</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default ChooseProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topTitleArea: {
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
        marginTop: hp('5%'),
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