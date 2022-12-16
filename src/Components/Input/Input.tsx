import React from 'react';
import { TextInput } from 'react-native';
import { InputProps } from '.';

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
      onKeyDown,
      onKeyUp,
      value,
      status,
      style,
      ...restProps
    },
    ref,
  ) => {
    return (
      <TextInput
        ref={ref}
        value={value?.toString()}
        {...restProps}
        // status={hasError ? 'error' : status ?? 'basic'}
        style={style}
        onChange={(event) =>
          onChange && onChange(event.nativeEvent.text, event)
        }
        onKeyPress={(event) => {
          onKeyDown && onKeyDown(event.nativeEvent.key, event);
          onKeyUp && onKeyUp(event.nativeEvent.key, event);
        }}
      />
    );
  },
);

export default Input;
