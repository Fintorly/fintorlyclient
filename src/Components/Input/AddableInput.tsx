import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { InputProps } from '.';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Input as UIInput } from '@ui-kitten/components';
import { useStyle } from '../../Theme/ThemeHelper';
import { ThemeKeys } from '../../Theme/ThemeKeys';
import Icon from "../../Styles/Icon"


export type InputPropsType = InputProps & {
  hasError?: boolean;
  errorText?: string;
  hasSuccess?: boolean;
  placeHolder: string;
  inputTitle: string;
};

export const AddableInput = React.forwardRef<UIInput, InputPropsType>(
  (
    {
      onChange,
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
    const [numTextInputs, setNumTextInputs] = React.useState(1);


    return (
      <View style={styles.inputComponent}  >
        <Text
          style={[styles.inputTitle, {
            color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
            fontFamily: themeVariables.themeVariables.fonts.extraBold
          }]}   >{inputTitle?.toString()}</Text>

        {[...Array(numTextInputs).keys()].map(key => {
          return <TouchableOpacity
            style={[styles.input, {
              backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorInputBackground],
            }]}
            onLongPress={() => setNumTextInputs(val => val - 1)}
          >
            <TextInput
              key={key}
              value={value?.toString()}
              {...restProps}
              style={[styles.textInput, {
                color: hasSuccess ? themeVariables.themeVariables.eva[ThemeKeys.colorInputSuccess] : hasError ? themeVariables.themeVariables.eva[ThemeKeys.colorInputError] : themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                fontFamily: themeVariables.themeVariables.fonts.bold,
              }]}
              placeholder={placeHolder}
              placeholderTextColor={themeVariables.themeVariables.eva[ThemeKeys.colorInputPlaceholder]}
              onChange={(event) =>
                onChange && onChange(event.nativeEvent.text, event)
              }
            />

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
          </TouchableOpacity>
        })}

        {
          hasError ? <Text style={[styles.errorText, { color: themeVariables.themeVariables.eva[ThemeKeys.colorInputError] }]}>{errorText}</Text> : null
        }
        <TouchableOpacity onPress={() => setNumTextInputs(val => val + 1)}
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={[styles.addButton, {
            color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
            borderColor: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
          }]}>{"+"}</Text>
        </TouchableOpacity>
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
  addButton: {
    alignSelf: 'center',
    fontSize: wp('6%'),
  }
});


export default AddableInput;
