import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {InputProps} from '.';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Input as UIInput} from '@ui-kitten/components';
import {useStyle} from '../../Theme/ThemeHelper';
import {ThemeKeys} from '../../Theme/ThemeKeys';
import Icon from '../../Styles/Icon';
import DatePicker from 'react-native-date-picker';
import {useTranslation} from 'react-i18next';

export type InputPropsType = InputProps & {
  hasError?: boolean;
  errorText?: string;
  hasSuccess?: boolean;
  placeHolder: string;
  inputTitle: string;
};

export const DateInput = React.forwardRef<UIInput, InputPropsType>(
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
    const [showIcon, setShowIcon] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const {i18n} = useTranslation();

    function get18YearsAgo() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 18);
      return date;
    }

    function maxYearAgo() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 100);
      return date;
    }

    return (
      <View style={styles.inputComponent}>
        <Text
          style={[
            styles.inputTitle,
            {
              color:
                themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
              fontFamily: themeVariables.themeVariables.fonts.extraBold,
            },
          ]}>
          {inputTitle?.toString()}
        </Text>
        <View
          style={[
            styles.input,
            {
              backgroundColor:
                themeVariables.themeVariables.eva[
                  ThemeKeys.colorInputBackground
                ],
            },
          ]}>
          <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
            <Text
              style={[
                styles.textInput,
                {
                  color: hasSuccess
                    ? themeVariables.themeVariables.eva[
                        ThemeKeys.colorInputSuccess
                      ]
                    : hasError
                    ? themeVariables.themeVariables.eva[
                        ThemeKeys.colorInputError
                      ]
                    : themeVariables.themeVariables.eva[
                        ThemeKeys.colorInputTitle
                      ],
                  fontFamily: themeVariables.themeVariables.fonts.bold,
                },
              ]}>
              {date.toLocaleDateString(i18n.language, {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            maximumDate={get18YearsAgo()}
            minimumDate={maxYearAgo()}
            mode="date"
          />
          <View style={styles.iconArea}>
            {hasSuccess ? (
              <Icon
                name="check"
                style={[
                  styles.inputIcon,
                  {
                    marginRight: wp('-4%'),
                  },
                ]}
                loop={false}
                autoPlay={true}
                width={wp('7%')}
                height={hp('7%')}
              />
            ) : (
              hasError && (
                <Icon
                  name="wrong"
                  style={styles.inputIcon}
                  loop={false}
                  autoPlay={true}
                  width={wp('4%')}
                  height={hp('4%')}
                />
              )
            )}
          </View>
        </View>
        {hasError ? (
          <Text
            style={[
              styles.errorText,
              {
                color:
                  themeVariables.themeVariables.eva[ThemeKeys.colorInputError],
              },
            ]}>
            {errorText}
          </Text>
        ) : null}
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
  },
});

export default DateInput;
