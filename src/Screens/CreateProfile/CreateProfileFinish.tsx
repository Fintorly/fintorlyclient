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
import Icon from '../../Styles/Icon';

type Props = {
  userType: number;
};

const CreateProfileFinish = (props: Props) => {
  const themeVariables = useStyle();
  const [progress, setProgress] = useState(0.6);
  const userType = props.route.params.userType;
  console.log(userType);

  useEffect(() => {
    setTimeout(() => {
      setProgress(1);
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
        <Text
          style={[
            styles.title,
            {
              color:
                themeVariables.themeVariables.eva[ThemeKeys.colorInputTitle],
              fontFamily: themeVariables.themeVariables.fonts.extraBold,
            },
          ]}>
          Harika!
        </Text>
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
          {userType === 1
            ? 'Başvurunuz başarıyla işleme alındı. Tahmini 1-2 iş günü içerisinde size dönüş yapacağız. Sağlıklı günler'
            : userType === 2 &&
              'Hesabınız başarıyla oluşturuldu! Sizi burada görmekten çok mutluyuz.'}
        </Text>
      </View>

      <Icon
        name="finish"
        style={{}}
        height={wp('100%')}
        width={wp('100%')}
        loop={true}
        autoPlay={true}
        disabled={true}
      />

      <Button
        text="Bitir"
        onPress={() => {}}
        style={{
          marginTop: hp('5%'),
        }}
      />
    </SafeAreaView>
  );
};

export default CreateProfileFinish;

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
