import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useStyle } from '../../Theme/ThemeHelper';
import { ThemeKeys } from '../../Theme/ThemeKeys';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { MAX_CHARACTER, MIN_CHARACTER } from '../../Helper/Constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import OtpInput from '../../Components/Input/OtpInput';
import { useNavigation } from '@react-navigation/native';
import NavigatorContext from '../../Navigator/NavigatorContext';

interface Props {
    username: string;
    email: string;
    password: string;
    code: string;
}

const RegisterOtp = (props: Props) => {
    const themeVariables = useStyle();
    const { t } = useTranslation();
    const navigation = useNavigation();
    const { setActiveStack } = useContext(NavigatorContext);

    return (
        <SafeAreaView style={[styles.container, {
            backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryBackground]
        }]} >
            <ScrollView bounces={false} style={{ flex: 1 }}  >
                <View style={styles.topTitleArea} >
                    <Text style={[styles.title, {
                        color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                        fontFamily: themeVariables.themeVariables.fonts.extraBold,
                    }]}>
                        E-Posta Doğrulama
                    </Text>
                    <Text
                        style={[styles.desc, {
                            color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400],
                            fontFamily: themeVariables.themeVariables.fonts.medium,
                            fontSize: wp('4.5%'),
                        }]}
                    >Lütfen
                        <Text style={{
                            color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                            fontFamily: themeVariables.themeVariables.fonts.medium,
                            fontSize: wp('4.5%'),
                        }} > {props.route.params.email} </Text>
                        e-posta adresine gelen 5 haneli doğrulama kodunu gir.</Text>
                </View>

                <OtpInput
                    hasTimer
                    // hasError
                    // code={props.code}
                    onCodeFilled={(code) => {
                        setActiveStack('profile');
                     }}
                />

                <View style={styles.changeMailArea} >
                    <Text
                        style={{
                            color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400],
                            fontFamily: themeVariables.themeVariables.fonts.medium,
                            fontSize: wp('4%'),
                        }}
                    >
                        E-posta adresin hatalı mı?
                    </Text>
                    <Text
                        onPress={() => { navigation.goBack() }}
                        style={{
                            color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                            fontFamily: themeVariables.themeVariables.fonts.medium,
                            fontSize: wp('4%'),
                            textDecorationLine: 'underline',
                            marginTop: hp('0.5%'),
                        }}>
                        Hemen değiştir
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterOtp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    topTitleArea: {
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
        marginTop: hp('5%'),
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
    acceptText: {
        fontSize: wp('3.2%'),
        marginTop: hp('1%'),
        textAlign: 'center',
    },
    fastLoginText: {
        fontSize: wp('3.5%'),
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: hp('5%'),
    },
    buttonArea: {
        marginTop: hp('5%'),
    },
    changeMailArea: {
        alignItems: 'center',
        marginTop: hp('2%'),
    }
})