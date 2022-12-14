/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
// import './src/Utils/i18n';
// import {startNetworkLogging} from 'react-native-network-logger';
// import {canAccessDiagnostic} from '~/Helpers/AppConfig';

// if (canAccessDiagnostic()) {
//     startNetworkLogging();
//   }

AppRegistry.registerComponent(appName, () => App);
