import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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


export type InputPropsType = InputProps & {
  hasError?: boolean;
  errorText?: string;
  hasSuccess?: boolean;
  placeHolder: string;
  inputTitle: string;
  data: Array<string>
};

export const DropDownInput = React.forwardRef<UIInput, InputPropsType>(
  (
    {
      hasSuccess,
      placeHolder,
      inputTitle,
      hasError,
      errorText,
      data
      // style,
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

          <SelectDropdown
            data={data}
            defaultButtonText={placeHolder}
            rowStyle={{
              backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorInputBackground],
              borderBottomWidth: 0,
            }}
            buttonStyle={{
              backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorInputBackground],
              width: wp('60%'),
              alignItems: 'center',
              borderRadius: 10,
            }}
            rowTextStyle={{
              color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
              fontFamily: themeVariables.themeVariables.fonts.semiBold,
              textAlign: 'left',
              marginHorizontal: wp('3%'),
              fontSize: wp('3.5%'),
            }}
            dropdownStyle={{
              backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorInputBackground],
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              width: wp('90%'),
              marginLeft: wp('-3%'),
              borderTopWidth: 1,
              borderTopColor: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray500],
            }}
            buttonTextStyle={{
              color: themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
              fontFamily: themeVariables.themeVariables.fonts.semiBold,
              textAlign: 'left',
              marginTop: hp('1.4%'),
              marginLeft: wp('-2%'),
              fontSize: wp('3.5%'),
            }}
            selectedRowStyle={{
              backgroundColor: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray500],
              borderWidth: 0,
            }}
            selectedRowTextStyle={{
              color: themeVariables.themeVariables.eva[ThemeKeys.colorNeutralWhite300],
            }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
            }}
            dropdownOverlayColor={'rgba(0, 0, 0, 0)'}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
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
  }
});


export default DropDownInput;
