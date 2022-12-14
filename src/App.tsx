/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useMemo } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { Navigator } from './Navigator/Navigator';
import { navigatorRef } from './Navigator/NavigatorRefs';

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

    // const memorizedCustomHeaders = useMemo(() => customHeaders, [customHeaders]);
    // useEffect(() => {
    //     if (uuid) {
    //         HTTPClient.instance.updateCustomHeaders(memorizedCustomHeaders);
    //     }
    // }, [memorizedCustomHeaders, uuid]);

    // if (!MobileApi.isSettedUp) {
    //     MobileApi.setup(HTTPClient.instance.axios);
    // }
    return (
        <>
            {/* <IconRegistry icons={ZGTarimIconPack} /> */}
            <StatusBar barStyle="light-content" />
            {/* <ThemeProvider>
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
                                        }}> */}
                                        <>
                                            <Navigator ref={navigatorRef} />
                                            {/* <Hud ref={hudRef} /> */}
                                        </>
                                    {/* </ApplicationProvider>
                                )}
                            </ThemeContext.Consumer>
                        </UserProvider>
                    </RegisterProvider>
                </NavigatorProvider>
            </ThemeProvider> */}
        </>
    );
};

export default App;
