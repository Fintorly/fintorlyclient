import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { InputProps } from '.';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Input as UIInput } from '@ui-kitten/components';
import { useStyle } from '../../Theme/ThemeHelper';
import { ThemeKeys } from '../../Theme/ThemeKeys';
import Icon from "../../Styles/Icon"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';

export type InputPropsType = InputProps & {
    hasError?: boolean;
    errorText?: string;
    hasSuccess?: boolean;
    placeHolder: string;
    inputTitle: string;
};

export const ImageInput = React.forwardRef<UIInput, InputPropsType>(
    (
        {
            value,
            status,
            hasSuccess,
            placeHolder,
            inputTitle,
            hasError,
            errorText,
            // style,
            ...restProps
        },
        ref,
    ) => {
        const themeVariables = useStyle();

        const [images, setImages] = useState(null);

        function launchGallery() {
            launchImageLibrary({
                mediaType: 'photo',
                quality: 0.5,
                selectionLimit: 10,
                // includeBase64: true,
                presentationStyle: 'formSheet',
            }, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorCode);
                } else {
                    setImages(response.assets);
                }
            });
        }

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
                        onPress={() => {
                            launchGallery()
                        }}
                        style={{
                            width: wp('60%'),
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={[styles.textInput, {
                                color: images != null ? themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle] : themeVariables.themeVariables.eva[ThemeKeys.colorInputPlaceholder],
                                fontFamily: themeVariables.themeVariables.fonts.bold,
                                fontSize: wp('4%'),
                            }]}
                        >{images != null ? images.length + " adet görsel eklendi" : placeHolder}</Text>
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
    button: {
        width: wp('60%'),
        justifyContent: 'center',
    }
});


export default ImageInput;
