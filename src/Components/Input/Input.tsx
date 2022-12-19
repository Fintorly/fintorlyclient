import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { InputProps } from '.';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Input as UIInput } from '@ui-kitten/components';
import { useStyle } from '../../Theme/ThemeHelper';
import { ThemeKeys } from '../../Theme/ThemeKeys';

export type InputPropsType = InputProps & {
  secureTextEntry?: boolean;
  keyboardType?:
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad';
  hasError?: boolean;
  returnKeyType?: 'search' | 'done' | 'go' | 'next' | 'send';
  showSoftInputOnFocus?: boolean;
};

export const Input = React.forwardRef<UIInput, InputPropsType>(
  (
    {
      onChange,
      // onKeyDown,
      // onKeyUp,
      value,
      status,
      // style,
      ...restProps
    },
    ref,
  ) => {
    const themeVariables = useStyle();
    return (
      <View style={styles.inputComponent}  >
        <TextInput
          ref={ref}
          value={value?.toString()}
          {...restProps}
          style={[styles.input, {
            backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryGray],
            color: themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryWhite]
          }]}
          placeholder="placeholder"
          placeholderTextColor={themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryWhite]}
          onChange={(event) =>
            onChange && onChange(event.nativeEvent.text, event)
          }
        // status={hasError ? 'error' : status ?? 'basic'}
        // onKeyPress={(event) => {
        //   onKeyDown && onKeyDown(event.nativeEvent.key, event);
        //   onKeyUp && onKeyUp(event.nativeEvent.key, event);
        // }}
        />
        <Text
          style={[styles.errorText, { color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralRed] }]}
        >error</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputComponent: {
    width: wp('90%'),
    alignSelf: 'center',
  },
  input: {
    height: hp('5%'),
    borderRadius: 5,
    marginVertical: hp('0.2%'),
  },
  errorText: {
    color: 'red',
  },
});


export default Input;
