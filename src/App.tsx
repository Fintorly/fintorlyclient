import React, { useEffect, useMemo } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { Navigator } from './Navigator/Navigator';
import Hud from './Hud/Hud';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import ThemeContext, { ThemeProvider, theme } from './Theme/ThemeContext';
// import { ZGTarimIconPack } from './Styles/IconAdapter';
import { NavigatorProvider } from './Navigator/NavigatorContext';
// import MobileApi from './Api/MobileApi';
// import HTTPClient from './Api/HttpClient';
import { RegisterProvider } from './Context/RegisterContext';
import { hudRef } from './Hud/HudHelper';
import { UserProvider } from './Context/UserContext';
import { themeMapping } from './Theme/ThemeHelper';
import { navigatorRef } from './Navigator/NavigatorRefs';
import {Appearance} from 'react-native';
// import { Channel } from './Api/Enums';
// import { useTranslation } from 'react-i18next';
// import { Language } from './Utils/Enum';
// import { DeviceManger } from './Helpers/DeviceManager';
// import { getCustomHeader } from './Helpers/HttpHelper';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
const App = () => {
    // const { i18n } = useTranslation();
    // const { OS, deviceModel, deviceVersion, uuid } = DeviceManger.getConstants();
    // const customHeaders = getCustomHeader(
    //     OS,
    //     Channel.MOBILE,
    //     deviceModel,
    //     uuid,
    //     deviceVersion,
    //     i18n.language as Language,
    // );

    //   const memorizedCustomHeaders = useMemo(() => customHeaders, [customHeaders]);
    //   useEffect(() => {
    //     if (uuid) {
    //       HTTPClient.instance.updateCustomHeaders(memorizedCustomHeaders);
    //     }
    //   }, [memorizedCustomHeaders, uuid]);

    //   if (!MobileApi.isSettedUp) {
    //     MobileApi.setup(HTTPClient.instance.axios);
    //   }

    const colorScheme = Appearance.getColorScheme();
    return (
        <>
            {/* <IconRegistry icons={ZGTarimIconPack} /> */}
            <StatusBar barStyle={
                colorScheme === 'dark' ? 'light-content' : 'dark-content'
            } />
            <ThemeProvider>
                <NavigatorProvider>
                    <RegisterProvider>
                        <UserProvider>
                            <ThemeContext.Consumer>
                                {props => (
                                    <ApplicationProvider
                                        {...eva}
                                        customMapping={themeMapping}
                                        theme={{
                                            ...eva[props.selectedTheme],
                                            ...theme[props.selectedTheme!],
                                        }}>
                                        <>
                                            <Navigator ref={navigatorRef} />
                                            <Hud ref={hudRef} />
                                        </>
                                    </ApplicationProvider>
                                )}
                            </ThemeContext.Consumer>
                        </UserProvider>
                    </RegisterProvider>
                </NavigatorProvider>
            </ThemeProvider>
        </>
    );
};

export default App;
