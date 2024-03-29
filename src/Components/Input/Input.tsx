import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
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
  secureTextEntry?: boolean;
  keyboardType?:
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad';
  returnKeyType?: 'search' | 'done' | 'go' | 'next' | 'send';
  hasError?: boolean;
  errorText?: string;
  hasSuccess?: boolean;
  showSoftInputOnFocus?: boolean;
  placeHolder: string;
  inputTitle: string;
  clearTextOnFocus?: boolean;
  onKeyDown?: (key: string, event: any) => void;
  onKeyUp?: (key: string, event: any) => void;
};

export const Input = React.forwardRef<UIInput, InputPropsType>(
  (
    {
      onChange,
      onKeyDown,
      onKeyUp,
      value,
      status,
      keyboardType,
      clearTextOnFocus,
      hasSuccess,
      placeHolder,
      inputTitle,
      secureTextEntry,
      hasError,
      errorText,
      // style,
      ...restProps
    },
    ref,
  ) => {
    const themeVariables = useStyle();
    const [showIcon, setShowIcon] = React.useState(false);
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
          <TextInput
            ref={ref}
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
            clearTextOnFocus={clearTextOnFocus}
            secureTextEntry={secureTextEntry && !showIcon}
            status={hasError ? 'error' : status ?? 'basic'}
            onKeyPress={(event) => {
              onKeyDown && onKeyDown(event.nativeEvent.key, event);
              onKeyUp && onKeyUp(event.nativeEvent.key, event);
            }}
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

                />  : hasError &&
                <Icon
                  name='wrong'
                  style={styles.inputIcon}
                  loop={false}
                  autoPlay={true}
                  width={wp('4%')}
                  height={hp('4%')}
                />
            }
            {secureTextEntry &&
              <Icon
                onPress={() => { setShowIcon(!showIcon) }}
                name={showIcon ? 'eyeoff' : 'eye'}
                style={[styles.inputIcon, {
                  paddingLeft: wp('2%'),
                }]}
                loop={true}
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
  }
});


export default Input;
