import Config from 'react-native-config';
import {EnvironmentTypes} from '../Common/enums/appConfig';

export const isProduction = () => {
  switch (Config.ENVIRONMENT) {
    case EnvironmentTypes.PROD:
      return true;
    case EnvironmentTypes.DEV:
    case EnvironmentTypes.PROD_PILOT:
    case EnvironmentTypes.STAGING:
    case EnvironmentTypes.UAT:
    default:
      return false;
  }
};

export const canAccessDiagnostic = () => {
  return !__DEV__ && !isProduction();
};
