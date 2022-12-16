import React from 'react';
import { Navigator } from './Navigator/Navigator';
import { navigatorRef } from './Navigator/NavigatorRefs';

const App = () => {
    return (
        <>
            <Navigator ref={navigatorRef} />
        </>
    );
};

export default App;
