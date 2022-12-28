import React from 'react';
import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { InputProps } from '.';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Input as UIInput } from '@ui-kitten/components';
import { useStyle } from '../../Theme/ThemeHelper';
import { ThemeKeys } from '../../Theme/ThemeKeys';
import Icon from "../../Styles/Icon"
import SelectDropdown from 'react-native-select-dropdown'
import Button from '../Button';
import ImageInput from './ImageInput';
import DropDownInput from './DropDownInput';
import AddableInput from './AddableInput';


export type InputPropsType = InputProps & {
    hasError?: boolean;
    errorText?: string;
    hasSuccess?: boolean;
    placeHolder: string;
    placeHolderFull: string;
    inputTitle: string;
    data: Array<string>
};

export const ModalInput = React.forwardRef<UIInput, InputPropsType>(
    (
        {
            hasSuccess,
            placeHolder,
            placeHolderFull,
            inputTitle,
            hasError,
            errorText,
            data
            // style,
        },
        ref,
    ) => {
        const themeVariables = useStyle();
        const [modalVisible, setModalVisible] = React.useState(false);
        const [link, setLink] = React.useState(null);
        return (
            <View style={styles.inputComponent}  >
                <Text
                    style={[styles.inputTitle, {
                        color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                        fontFamily: themeVariables.themeVariables.fonts.extraBold
                    }]}   >{inputTitle?.toString()}</Text>
                <View style={[styles.input, {
                    backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorInputBackground],
                }]}  >

                    <TouchableOpacity
                        style={{
                            width: wp('60%'),
                            justifyContent: 'center',
                        }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text
                            style={[styles.textInput, {
                                color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                                fontFamily: themeVariables.themeVariables.fonts.bold,
                                fontSize: wp('3.5%')
                            }]}
                        >{link === null ? placeHolder : placeHolderFull}</Text>
                    </TouchableOpacity>

                    <View style={styles.iconArea} >
                        {
                            hasSuccess ?
                                <Icon
                                    name='check'
                                    style={[styles.inputIcon, {
                                        marginRight: wp('-4%'),
                                    }]}
                                    loop={false}
                                    autoPlay={true}
                                    width={wp('7%')}
                                    height={hp('7%')}

                                /> : hasError &&
                                <Icon
                                    name='wrong'
                                    style={styles.inputIcon}
                                    loop={false}
                                    autoPlay={true}
                                    width={wp('4%')}
                                    height={hp('4%')}
                                />
                        }
                    </View>
                </View>
                {
                    hasError ? <Text style={[styles.errorText, { color: themeVariables.themeVariables.eva[ThemeKeys.colorInputError] }]}>{errorText}</Text> : null
                }

                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <SafeAreaView style={[{
                        flex: 1,
                        backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryBackground]
                    }]} >
                        <View style={styles.topTitleArea} >
                            <Text style={[styles.title, {
                                color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                                fontFamily: themeVariables.themeVariables.fonts.extraBold,
                            }]}>Topluluğunuzu Ekleyin</Text>
                            <Text
                                style={[styles.desc, {
                                    color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400],
                                    fontFamily: themeVariables.themeVariables.fonts.medium,
                                }]}
                            >Bir topluluğunuz varsa fintorly mentör başvurunuz daha çabuk sonuç alır. Eğer topluluğunuz gizli ise ekran görüntüsü paylaşınız.</Text>
                        </View>

                        <View>
                            <AddableInput
                                inputTitle='Topluluk Türü'
                                placeHolder='telegram/grupname'
                            />

                            <ImageInput
                                inputTitle="Topluluk Ekran Görüntüsü"
                                placeHolder='Max 5mb file.'
                            // value={values.namesurname}
                            // onChange={(text) => setValues({ ...values, namesurname: text })}
                            />

                            <Button
                                onPress={() => { setModalVisible(false) }}
                                text='İlerle'
                                // disabled={true}
                                style={{
                                    marginTop: hp('3%'),
                                }}
                            />
                        </View>

                    </SafeAreaView>

                </Modal>

            </View>
        );
    },
);

const styles = StyleSheet.create({
    inputComponent: {
        width: wp('90%'),
        alignSelf: 'center',
        marginVertical: hp('2%'),
        display: 'flex',
    },
    input: {
        height: hp('6.5%'),
        borderRadius: 10,
        marginVertical: hp('0.2%'),
        flexDirection: 'row',
        paddingHorizontal: wp('3%'),
        display: 'flex',
        justifyContent: 'space-between',
    },
    textInput: {
        display: 'flex',
        width: wp('60%'),
    },
    iconArea: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputTitle: {
        marginBottom: hp('0.5%'),
        fontSize: wp('4%'),
        fontWeight: 'bold',
    },
    inputIcon: {
        fontSize: wp('5%'),
        justifyContent: 'flex-end',
    },
    inputIconSuccess: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: wp('5%'),
    },
    errorText: {
        fontSize: wp('3%'),
    },
    secureText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: wp('5%'),
        lineHeight: hp('1%'),
    },
    topTitleArea: {
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
        marginTop: hp('2%'),
        marginBottom: hp('3%'),
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
});


export default ModalInput;
