import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
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
import yup from '../../Common/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LangKeys } from '../../Locale/LangKeys';
import { useTranslation } from 'react-i18next';
import { GoToRegisterOtp } from '../../Navigator/Router';

interface RegisterForm {
    userName: string;
    email: string;
    password: string;
}

const Register = () => {
    const themeVariables = useStyle();
    const initialValues: RegisterForm = { userName: '', email: '', password: '' };
    const [values, setValues] = useState(initialValues);
    const { t } = useTranslation();

    const schema = yup.object().shape({
        userName: yup
            .string()
            .required(t(LangKeys.customer_number_required))
            .min(
                MIN_CHARACTER.USERNAME,
                t(LangKeys.validation_min_character, {
                    number: MIN_CHARACTER.USERNAME,
                }),
            )
            .max(
                MAX_CHARACTER.CUSTOMER_NUMBER,
                t(LangKeys.validation_max_character, {
                    number: MAX_CHARACTER.CUSTOMER_NUMBER,
                }),
            ).max(
                MAX_CHARACTER.USERNAME,
                t(LangKeys.validation_max_character, {
                    number: MAX_CHARACTER.USERNAME,
                }),
            ),
        email: yup
            .string()
            .required(t(LangKeys.tckn_required))
            .min(
                MIN_CHARACTER.EMAIL,
                t(LangKeys.validation_min_character, {
                    number: MIN_CHARACTER.EMAIL,
                }),
            ).max(
                MAX_CHARACTER.EMAIL,
                t(LangKeys.validation_max_character, {
                    number: MAX_CHARACTER.EMAIL,
                }),
            ).test('email', t(LangKeys.validation_email), (value) => {
                if (value) {
                    return value.includes('@');
                }
                return true;
            }),
        password: yup.string().required(t(LangKeys.password_login_required))
            .min(MIN_CHARACTER.PASSWORD_LENGTH, t(LangKeys.validation_min_character, { number: MIN_CHARACTER.PASSWORD_LENGTH }))
            .max(MAX_CHARACTER.PASSWORD_LENGTH, t(LangKeys.validation_max_character, { number: MAX_CHARACTER.PASSWORD_LENGTH }))
    });

    const defaultValues: RegisterForm = {
        userName: __DEV__ ? 'fuykan37' : '',
        email: __DEV__ ? 'furkanvsarda@gmail.com' : '',
        password: __DEV__ ? 'Fuykan1041!' : '',
    };

    // const { handleSubmit, errors, control } = useForm({
    //     resolver: yupResolver(schema),
    //     defaultValues,
    // });


    return (
        <SafeAreaView style={[styles.container, {
            backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryBackground]
        }]} >
            <ScrollView bounces={false} style={{ flex: 1 }}  >
                <View style={styles.topTitleArea} >
                    <View style={styles.topTitle} >
                        <Text style={[styles.title, {
                            color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                            fontFamily: themeVariables.themeVariables.fonts.extraBold,
                        }]}>Kayıt Ol</Text>
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
                    >Hesap oluşturarak fintorly’nin ayrıcalıklı dünyasına katılabilirsin.</Text>
                </View>

                <Input
                    inputTitle='Kullanıcı Adı'
                    placeHolder='lavukyunus37'
                    value={values.userName}
                    onChange={(text) => setValues({ ...values, userName: text })}
                // hasError={!!errors.userName}
                />
                <Input
                    inputTitle='E-Posta'
                    placeHolder='serseribela_37@gmail.com   '
                    value={values.email}
                    onChange={(text) => setValues({ ...values, email: text })}
                />
                <Input
                    inputTitle='Şifre'
                    placeHolder='En az 8 karakter'
                    secureTextEntry={true}
                    value={values.password}
                    onChange={(text) => setValues({ ...values, password: text })}
                />

                <View style={styles.buttonArea} >
                    <Button
                        text='Hesap Oluştur'
                        onPress={() => {
                            GoToRegisterOtp(defaultValues)
                        }}
                        style={{
                            paddingHorizontal: wp('14%'),
                        }}
                    // disabled={true}
                    />
                    <Text
                        style={[styles.acceptText, {
                            color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400],
                            fontFamily: themeVariables.themeVariables.fonts.medium,
                        }]}
                    >Kayıt olarak sözleşme vs kabul etmiş sayılırsınız</Text>
                </View>

                <Text
                    style={[styles.fastLoginText, {
                        color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                        fontFamily: themeVariables.themeVariables.fonts.medium,
                    }]}
                >Zaten hesabın var mı? Hemen oturum aç.</Text>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
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
    }
})