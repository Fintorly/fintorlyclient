import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStyle } from '../../Theme/ThemeHelper';
import { ThemeKeys } from '../../Theme/ThemeKeys';
import {
    widthPercentageToDP
        as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProgresBar from '../../Components/ProgressBar';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import DateInput from '../../Components/Input/DateInput';
import DropDownInput from '../../Components/Input/DropDownInput';
import { GoToCreateProfileCryptoInformation } from '../../Navigator/Router';

type Props = {
    userType: number
}

const CreateProfilePersonelInfo = (props: Props) => {
    const themeVariables = useStyle();
    const [progress, setProgress] = useState(0);
    const userType = props.route.params.userType;

    useEffect(() => {
        setTimeout(() => {
            setProgress(0.3)
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
                <View style={styles.topTitle} >
                    <Text style={[styles.title, {
                        color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                        fontFamily: themeVariables.themeVariables.fonts.extraBold,
                    }]}>Kişisel Bilgiler</Text>
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
                >Seni daha iyi tanıyabilmemiz için birkaç kişisel bilgine ihtiyacımız var.</Text>
                <Text
                    style={[styles.desc, {
                        color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                        fontFamily: themeVariables.themeVariables.fonts.medium,
                        textDecorationLine: 'underline',
                    }]}
                >Neden ihtiyacımız var?</Text>
            </View>

            <View>
                <Input
                    inputTitle='İsim ve Soyisim'
                    placeHolder='Erdem DÜDÜK'
                // value={values.namesurname}
                // onChange={(text) => setValues({ ...values, namesurname: text })}
                />
                <DropDownInput
                    data={["Erkek", "Kadın", "Diğer"]}
                    inputTitle='Cinsiyet'
                    placeHolder='Cinsiyet Seçiniz'
                    // value={values.namesurname}
                    // onChange={(text) => setValues({ ...values, namesurname: text })}
                    hasError={true}
                    errorText='Cinsiyet seçiniz.'
                />
                <DateInput
                    inputTitle='Doğum Tarihi'
                    placeHolder='16/08/2003'
                    // value={values.namesurname}
                    // onChange={(text) => setValues({ ...values, namesurname: text })}
                    errorText='Doğum tarihi 18 yaşından küçük olamaz.'
                    hasError={true}
                />
                <Button
                    onPress={() => { GoToCreateProfileCryptoInformation({ userType: userType }) }}
                    text='İlerle'
                    disabled={false}
                    style={{
                        marginTop: hp('3%'),
                    }}
                />
            </View>

        </SafeAreaView>
    )
}

export default CreateProfilePersonelInfo

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