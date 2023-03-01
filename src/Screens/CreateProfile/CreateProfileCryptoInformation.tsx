import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStyle} from '../../Theme/ThemeHelper';
import {ThemeKeys} from '../../Theme/ThemeKeys';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProgresBar from '../../Components/ProgressBar';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import DateInput from '../../Components/Input/DateInput';
import DropDownInput from '../../Components/Input/DropDownInput';
import ModalInput from '../../Components/Input/ModalInput';
import {
  GoToCreateProfileFinish,
  GoToCreateProfileInterested,
} from '../../Navigator/Router';

type Props = {
  userType: number;
};

const CreateProfileCryptoInformation = (props: Props) => {
  const themeVariables = useStyle();
  const [progress, setProgress] = useState(0.3);
  const userType = props.route.params.userType;
  console.log(userType);

  useEffect(() => {
    setTimeout(() => {
      setProgress(0.6);
    }, 1000);
  }),
    [];

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            themeVariables.themeVariables.eva[ThemeKeys.colorPrimaryBackground],
        },
      ]}>
      <ProgresBar
        backgroundColor={
          themeVariables.themeVariables.eva[ThemeKeys.colorNeutralGray400]
        }
        progressColor={
          themeVariables.themeVariables.eva[ThemeKeys.colorNeutralWhite200]
        }
        progress={progress}
      />
      <View style={styles.topTitleArea}>
        <View style={styles.topTitle}>
          <Text
            style={[
              styles.title,
              {
                color:
                  themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
                fontFamily: themeVariables.themeVariables.fonts.extraBold,
              },
            ]}>
            Kripto Bilgileri
          </Text>
          <Text
            style={[
              styles.backButton,
              {
                color:
                  themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
              },
            ]}>
            -
          </Text>
        </View>
        <Text
          style={[
            styles.desc,
            {
              color:
                themeVariables.themeVariables.eva[
                  ThemeKeys.colorNeutralGray400
                ],
              fontFamily: themeVariables.themeVariables.fonts.medium,
            },
          ]}>
          Kripto paralar, tokenler hakkında ne kadar bilgilisin?
        </Text>
      </View>

      <View>
        <DropDownInput
          inputTitle={
            userType != 1 ? 'Kripto Para Bilgisi' : 'Kripto Para Tecrübeniz'
          }
          data={['3-6 Ay', '6-12 Ay', '12-24 Ay', '24 Ay ve Üzeri']}
          placeHolder="3-6 Ay"
          // value={values.namesurname}
          // onChange={(text) => setValues({ ...values, namesurname: text })}
          onSelectionChange={() => {
            setProgress(0.09);
          }}
        />

        {userType === 1 && (
          <View>
            <DropDownInput
              inputTitle="Topluluğunuz var mı? Varsa kaç kişi?"
              data={[
                '0-100',
                '100-300',
                '300-1000',
                '1000-2000',
                '2000 ve üzeri',
                'Yok',
              ]}
              placeHolder="3-6 Ay"
              // value={values.namesurname}
              // onChange={(text) => setValues({ ...values, namesurname: text })}
              onSelectionChange={() => {
                setProgress(0.09);
              }}
            />
            <ModalInput
              inputTitle="Topluluğunuzun linki"
              data={['Bağla']}
              placeHolder="Henüz topluluk eklenmedi."
              placeHolderFull="Topluluk eklendi"
              // value={values.namesurname}
              // onChange={(text) => setValues({ ...values, namesurname: text })}
              onSelectionChange={() => {
                setProgress(0.09);
              }}
            />
          </View>
        )}

        <Button
          onPress={() => {
            userType === 1
              ? GoToCreateProfileFinish({userType: userType})
              : GoToCreateProfileInterested({userType: userType});
          }}
          text="İlerle"
          // disabled={true}
          style={{
            marginTop: hp('3%'),
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateProfileCryptoInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topTitleArea: {
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
  },
  topTitle: {
    flexDirection: 'row',
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
  chooseProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'),
  },
  profileTitle: {
    fontSize: wp('5%'),
    marginTop: hp('1%'),
  },
});
