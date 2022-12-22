import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemeKeys } from '../../Theme/ThemeKeys'
import { useStyle } from '../../Theme/ThemeHelper'
import { useTranslation } from 'react-i18next'
import { LangKeys } from '../../Locale/LangKeys'
import Input from '../../Components/Input'

type Props = {}

const HomeScreen = (props: Props) => {
    const { themeVariables } = useStyle();
    const { t } = useTranslation()
    return (
        <View style={[{
            backgroundColor: themeVariables.eva[ThemeKeys.colorPrimaryBackground]
        }, styles.container]} >
            <Text style={{
                color: themeVariables.eva[ThemeKeys.colorPrimaryWhite]
            }} >{t(LangKeys["home_stack"])} </Text>
            <Input placeHolder='yavsakyunus09 ' inputTitle='Kullanıcı Adı' hasIcon
                returnKeyType='next'
                hasSuccess
            />
            <Input placeHolder='test' inputTitle='Test' clearTextOnFocus
                secureTextEntry
                hasSuccess
            />
            <Input placeHolder='test' inputTitle='Test' clearTextOnFocus
                secureTextEntry
                hasError
            />
            <Input placeHolder='test' inputTitle='Test'
                hasError
                hasIcon
            />
            <Input placeHolder='test' inputTitle='Test' clearTextOnFocus
                hasIcon
            />
            <Input placeHolder='test' inputTitle='Test' clearTextOnFocus
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})