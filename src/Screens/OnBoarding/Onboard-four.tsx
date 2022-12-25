import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useStyle } from '../../Theme/ThemeHelper';
import { ThemeKeys } from '../../Theme/ThemeKeys';
import Icon from '../../Styles/Icon';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../Components/Button';
import { useTranslation } from 'react-i18next';
import { LangKeys } from '../../Locale/LangKeys';
import { GoToHome } from '../../Navigator/Router';
import NavigatorContext from '../../Navigator/NavigatorContext';

type Props = {}

const OnboardFour = (props: Props) => {
    const themeVariables = useStyle();
    const { t } = useTranslation()
    const { setActiveStack } = useContext(NavigatorContext);
    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryBackground] }]}
        >
            <Text onPress={() => { }} style={[styles.passText, {
                color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                fontFamily: themeVariables.themeVariables.fonts.bold,
            }]} > {t(LangKeys.skip)}</Text>
            <Icon
                name='news'
                style={styles.icon}
                loop={true}
                autoPlay={true}
                width={wp('100%')}
                height={hp('40%')}
            />
            <Text onPress={() => { }} style={[styles.title, {
                color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                fontFamily: themeVariables.themeVariables.fonts.bold,
            }]} >{t(LangKeys.onboard_title_page4)}</Text>
            <Text onPress={() => { }} style={[styles.desc, {
                color: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryOrange],
                fontFamily: themeVariables.themeVariables.fonts.semiBold,
            }]} >{t(LangKeys.onboard_desc1_page4)}
                <Text onPress={() => { }} style={[styles.desc, {
                    color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400],
                    fontFamily: themeVariables.themeVariables.fonts.medium,
                }]} > {t(LangKeys.onboard_desc2_page4)}
                    <Text onPress={() => { }} style={[styles.desc, {
                        color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400],
                        fontFamily: themeVariables.themeVariables.fonts.semiBold,
                    }]} > {t(LangKeys.onboard_desc3_page4)}
                        <Text onPress={() => { }} style={[styles.desc, {
                            color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                            fontFamily: themeVariables.themeVariables.fonts.semiBold,
                        }]} > {t(LangKeys.onboard_desc4_page4)}
                            <Text onPress={() => { }} style={[styles.desc, {
                                color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400],
                                fontFamily: themeVariables.themeVariables.fonts.semiBold,
                            }]} > {t(LangKeys.onboard_desc5_page4)}
                            </Text>
                        </Text>
                    </Text>
                </Text>
            </Text>

            <View style={styles.button}>
                <Button
                    text={t(LangKeys.lets_start_button)}
                    onPress={() => {
                        setActiveStack("auth")
                       }}
                />
            </View>

        </SafeAreaView >
    )
}

export default OnboardFour

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    passText: {
        alignSelf: 'flex-end',
        marginRight: wp('5%'),
        fontSize: wp('3.5%'),
    },
    icon: {
        alignSelf: 'center',
    },
    title: {
        alignSelf: 'center',
        fontSize: wp('6%'),
        marginTop: hp('5%'),
    },
    desc: {
        alignSelf: 'center',
        fontSize: wp('4%'),
        marginTop: hp('2%'),
        width: wp('80%'),
        textAlign: 'center',
    },
    button: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: hp('8%'),
    }
})