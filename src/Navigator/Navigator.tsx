import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigatorContext, { StackType } from './NavigatorContext';
import { useTranslation } from 'react-i18next';
import {
  NavButton,
} from './NavigatorHelper';
import { Alert, Keyboard, Linking } from 'react-native';
import {
  isSecureLink,
  nonSecureDeepLinkMapper,
  secureDeepLinkMapper,
} from './DeepLinkMapper';
import { navigationRef } from './NavigatorRefs';
import RNShake from 'react-native-shake';
import Splash from '../Screens/Splash/Splash';
import { useStyle } from '../Theme/ThemeHelper';
import { ThemeKeys } from '../Theme/ThemeKeys';
import HomeScreen from '../Screens/Stack/HomeScreen';
import { LangKeys } from '../Locale/LangKeys';
import OnboardOne from '../Screens/OnBoarding/Onboard-one';
import OnboardTwo from '../Screens/OnBoarding/Onboard-two';
import OnboardThree from '../Screens/OnBoarding/Onboard-three';
import OnboardFour from '../Screens/OnBoarding/Onboard-four';
import Register from '../Screens/Auth/Register';
import RegisterOtp from '../Screens/Auth/RegisterOtp';

const Stack = createStackNavigator();

function HomeStack() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        // ...DefaultHeaderStyle(),
        // ...headerLogo(),
      }}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        // options={{
        //   headerTitle: t(LangKeys.screen_offer_transaction_result),
        // }}
        options={{ headerShown: true, }}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        // ...DefaultHeaderStyle(),
      }}>
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerTitle: t(LangKeys.favorite),
        }}
      />
      <Stack.Screen
        name="AdvertiseDetail"
        component={AdvertiseDetailScreen}
      // options={{
      //   headerTitle: t(LangKeys.advertise_detail),
      //   ...NavButton({
      //     position: 'right',
      //     iconType: IconType.Favorite,
      //   }),
      // }}
      />
    </Stack.Navigator>
  );
}

function AdvertiseStack() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        // ...DefaultHeaderStyle(),
      }}>
      <Stack.Screen
        name="CreateAdvertiseLanding"
        component={CreateAdvertiseLandingScreen}
        options={{
          headerTitle: t(LangKeys.create_advertise),
        }}
      />
    </Stack.Navigator>
  );
}

function MyAdsStack() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        // ...DefaultHeaderStyle(),
      }}>
      <Stack.Screen
        name="MyAds"
        component={MyAdsScreen}
        options={{
          headerTitle: t(LangKeys.my_ads),
        }}
      />
    </Stack.Navigator>
  );
}

function MyAccountStack() {
  const { t } = useTranslation();
  const { userInfo } = useContext(UserContext);
  return (
    <Stack.Navigator
      screenOptions={{
        // ...DefaultHeaderStyle(),
        headerShown: false,
      }}
      initialRouteName="MyAccount">
      <Stack.Screen
        name="MyAccount"
        component={MyAccountScreen}
        // options={{
        //   headerTitle: t(LangKeys.my_account),
        // }}
        initialParams={{
          userInfo: userInfo,
          shouldRefresh: true,
        }}
      />
    </Stack.Navigator>
  );
}

function TabStack() {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const { themeVariables, navigationStyles } = useStyle();
  const { t } = useTranslation();
  // const { userInfo } = useContext(UserContext);
  // useEffect(() => {
  //   Keyboard.addListener('keyboardDidShow', handleKeyboardShown);
  //   Keyboard.addListener('keyboardDidHide', handleKeyboardHidden);
  //   return () => {
  //     Keyboard.removeListener('keyboardDidShow', handleKeyboardShown);
  //     Keyboard.removeListener('keyboardDidHide', handleKeyboardHidden);
  //   };
  // }, []);

  const handleKeyboardShown = () => setKeyboardShown(true);
  const handleKeyboardHidden = () => setKeyboardShown(false);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        // activeTintColor: themeVariables.eva[ThemeKeys.colorNeutralDarkBlue],
        // inactiveTintColor: themeVariables.eva[ThemeKeys.colorNeutralDarkBlue],
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{
          tabBarLabel: t(LangKeys.home_stack),
          // tabBarIcon: ({ color }) => renderTabBarIcon(IconType.Feed, color),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      initialRouteName={'Register'}
      screenOptions={{
        // ...DefaultHeaderStyle(),
        // ...headerLogo(),
        // ...DefaultStackHeaderStyle(),
        // ...HeaderBackIcon(),
      }}>
      <Stack.Screen
        name="Register"
        options={{
          headerTitle: () => undefined,
          headerTransparent: true,
          headerShown: false,
          gestureEnabled: false,
        }}
        component={Register}
      />
         <Stack.Screen
        name="RegisterOtp"
        options={{
          headerTitle: () => undefined,
          headerTransparent: true,
          headerShown: false,
          gestureEnabled: false,
        }}
        component={RegisterOtp}
      />
    </Stack.Navigator>
  );
}

function DiagnosticStack() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName={'Diagnostic'}>
      <Stack.Screen
        name="Diagnostic"
        options={{
          headerTitle: t(LangKeys.diagnostic),
          headerBackTitle: t(LangKeys.back),
        }}
        component={Diagnostic}
      />
      <Stack.Screen
        name="NetworkLogger"
        options={{
          headerTitle: t(LangKeys.network_logger),
        }}
        component={Logger}
      />
    </Stack.Navigator>
  );
}

function PaymentStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...DefaultHeaderStyle(),
        ...headerLogo(),
      }}
      initialRouteName="PaymentModal">
      <Stack.Screen name="PaymentResult" component={PaymentResultScreen} />
      <Stack.Screen
        name="PaymentModal"
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
        component={PaymentModalScreen}
      />
    </Stack.Navigator>
  );
}

const RootStack = createStackNavigator();

type RootStackProps = {
  activeStack: string;
};
const RootStackScreen: React.FC<RootStackProps> = props => {
  return (
    <RootStack.Navigator
      screenOptions={{ animationEnabled: false, headerBackTitle: ' ', headerShown: false }}
    >
      {props.activeStack === 'splash' ? (
        <RootStack.Screen name="Splash" component={Splash} options={{
          animationEnabled: true,
          animationTypeForReplace: 'push',
        }} />
      )
        : props.activeStack === 'auth' ? (
          <RootStack.Screen name="AuthStack" component={AuthStack} />
        )
          : props.activeStack === "home" ? (
            <RootStack.Screen name="TabStack" component={TabStack} />
          ) :
            null
      }
      <RootStack.Screen name="TabStack" component={TabStack} />
      <RootStack.Screen name="OnBoardOne" component={OnboardOne} />
      <RootStack.Screen name="OnBoardTwo" component={OnboardTwo} />
      <RootStack.Screen name="OnBoardThree" component={OnboardThree} />
      <RootStack.Screen name="OnBoardFour" component={OnboardFour} />
    </RootStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export type NavigationRefType = {
  navigationChanged: () => void;
  changeActiveStack: (stackType: StackType) => void;
  shouldBlockNavigation: (name: string, params: any) => Promise<boolean>;
};

export const Navigator = React.forwardRef(
  ({ }, ref?: React.Ref<NavigationRefType>) => {
    const { activeStack, setActiveStack } = useContext(NavigatorContext);
    const { t } = useTranslation();
    const handledUrl = useRef<string>('');

    const handleLinking = (url?: string | null) => {
      if (url) {
        if (isSecureLink(url)) {
          handledUrl.current = url;
        } else {
          Linking.openURL(url);
        }
      }
    };

    const handleNavigationChanged = () => {
      setTimeout(() => {
        if (handledUrl.current) {
          Linking.openURL(handledUrl.current);
          handledUrl.current = '';
        }
      }, 500);
    };

    useEffect(() => {
      let lastUrl: string = '';

      Linking.getInitialURL().then(url => {
        handleLinking(url);
      });

      Linking.addEventListener('url', ({ url }) => {
        if (lastUrl !== url) {
          // workaround - prevent for fire multipleTimes
          lastUrl = url;
          handleLinking(url);
        }
      });
    }, []);

    // const { userInfo } = useContext(UserContext);
    const checkList = ['AdvertiseGiveOffer', 'PurchaseSummary'];
    // const handleShouldBlockNavigation = async (
    //   name: string,
    //   params?: any,
    // ): Promise<boolean> => {
    //   if (!checkList.includes(name)) {
    //     return false;
    //   }
    //   if (!hasMainCustomerApproveDocument(userInfo)) {
    //     return true;
    //   }
    //   if (name === 'AdvertiseGiveOffer' || name === 'PurchaseSummary') {
    //     switch (
    //     hasAccessCategoryGroupTypeWithWarning(
    //       params.userAccessType,
    //       params.categoryGroupType,
    //       params.advertiseType,
    //     )
    //     ) {
    //       case 0:
    //         return true;
    //       default:
    //         return !(await canMakeOffer(
    //           params?.advertiseNo,
    //           params?.advertiseType,
    //         ));
    //     }
    //   }
    //   return false;
    // };

    // useImperativeHandle(ref, () => ({
    //   navigationChanged: () => handleNavigationChanged(),
    //   changeActiveStack: (stackType: StackType) => setActiveStack(stackType),
    //   shouldBlockNavigation: (name: string, params: any) =>
    //     handleShouldBlockNavigation(name, params),
    // }));

    // useEffect(() => {
    //   const subscription = RNShake.addListener(() => {
    //     if (canAccessDiagnostic()) {
    //       Alert.alert(t(LangKeys.diagnostic), t(LangKeys.diagnostic_question), [
    //         {
    //           text: t(LangKeys.button_continue),
    //           onPress: () => {
    //             GoToDiagnostic();
    //           },
    //         },
    //         {
    //           text: t(LangKeys.button_cancel),
    //           style: 'cancel',
    //         },
    //       ]);
    //     }
    //   });

    //   return () => {
    //     subscription.remove();
    //   };
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
      <NavigationContainer
        ref={navigationRef}
        linking={
          activeStack === 'postLogin'
            ? secureDeepLinkMapper
            : nonSecureDeepLinkMapper
        }>
        <RootStackScreen activeStack={activeStack} />
        {/* <GlobalConfirmModal ref={globalConfirmModalRef} /> */}
      </NavigationContainer>
    );
  },
);
